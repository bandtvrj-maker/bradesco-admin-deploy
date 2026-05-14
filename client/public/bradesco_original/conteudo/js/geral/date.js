Date.dayNames=['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
Date.abbrDayNames=['D','S','T','Q','Q','S','S'];
Date.monthNames=['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
Date.abbrMonthNames=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
Date.firstDayOfWeek=7;
Date.format='dd/mm/yyyy';
Date.fullYearStart='20';
(function(){
	function add(name,method){
		if(!Date.prototype[name] ){
			Date.prototype[name]=method;
		}
	};
	add("isLeapYear",function(){
		var y=this.getFullYear();
		return(y%4==0 && y%100!=0)||y%400==0;
	});
	add("isWeekend",function(){
		return this.getDay()==0||this.getDay()==6;
	});
	add("isWeekDay",function(){
		return !this.isWeekend();
	});
	add("getDaysInMonth",function(){
		return [31,(this.isLeapYear()?29:28),31,30,31,30,31,31,30,31,30,31][this.getMonth()];
	});
	add("getDayName",function(abbreviated){
		return abbreviated?Date.abbrDayNames[this.getDay()]:Date.dayNames[this.getDay()];
	});
	add("getMonthName",function(abbreviated){
		return abbreviated?Date.abbrMonthNames[this.getMonth()]:Date.monthNames[this.getMonth()];
	});
	add("getDayOfYear",function(){
		var tmpdtm=new Date("1/1/"+this.getFullYear());
		return Math.floor((this.getTime() - tmpdtm.getTime())/86400000);
	});
	add("getWeekOfYear",function(){
		return Math.ceil(this.getDayOfYear()/7);
	});
	add("setDayOfYear",function(day){
		this.setMonth(0);
		this.setDate(day);
		return this;
	});
	add("addYears",function(num){
		this.setFullYear(this.getFullYear()+num);
		return this;
	});
	add("addMonths",function(num){
		var tmpdtm=this.getDate();
		this.setMonth(this.getMonth()+num);
		if(tmpdtm>this.getDate())this.addDays(-this.getDate());
		return this;
	});
	add("addDays",function(num){
		this.setDate(this.getDate()+num);
		return this;
	});
	add("addHours",function(num){
		this.setHours(this.getHours()+num);
		return this;
	});
	add("addMinutes",function(num){
		this.setMinutes(this.getMinutes()+num);
		return this;
	});
	add("addSeconds",function(num){
		this.setSeconds(this.getSeconds()+num);
		return this;
	});
	add("zeroTime",function(){
		this.setMilliseconds(0);
		this.setSeconds(0);
		this.setMinutes(0);
		this.setHours(0);
		return this;
	});
	add("asString",function(){
		var r=Date.format;
		return r.split('yyyy').join(this.getFullYear()).split('yy').join((this.getFullYear()+'').substring(2)).split('mmm').join(this.getMonthName(true)).split('mm').join(_zeroPad(this.getMonth()+1)).split('dd').join(_zeroPad(this.getDate()));
	});
	Date.fromString=function(s){
		/*
		IN3336249 - Alteração feita 31/10/2019
		Problema ao utilizar o setMonth, alterava o ano e travava o calendario.
		*/
		var f=Date.format;
		var d=new Date('01/01/1977');	
		var dd, mm, yyyy, formatData, tmAno, ano, tmMes, mes;
		var tam = s.length;

		switch(tam) {//Verifica qual a formatacao da data recebida
		  case 8:
			formatData = 'dd/mm/yy';
			tmAno = 2;
			tmMes = 2;
			ano = 'yy';
			mes = 'mm';
			break;
		  case 9:
			formatData = 'dd/mmm/yy';
			tmAno = 2;
			tmMes = 3;
			ano = 'yy';
			mes = 'mmm';
			break;
		  case 10:
			formatData = 'dd/mm/yyyy';
			tmAno = 4;
			tmMes = 2;
			ano = 'yyyy';
			mes = 'mm';
			break;
		  case 11:
			formatData = 'dd/mmm/yyyy';
			tmAno = 4;
			tmMes = 3;
			ano = 'yyyy';
			mes = 'mmm';
			break;
		  default:
			return false;
		}
		var iY=formatData.indexOf(ano);
		if(iY>-1){
			if (tmAno == 2){
				yyyy = Number(Date.fullYearStart+s.substr(iY,tmAno));
			} else {
				yyyy = Number(s.substr(iY,tmAno));
			}
		}
		
		var iM=formatData.indexOf(mes);
		if (tmMes == 2){
			mm = Number(s.substr(iM,tmMes)) - 1;
		} else {
			var mStr=s.substr(iM,tmMes);
			for(var i=0;i<Date.abbrMonthNames.length;i++){
				if(Date.abbrMonthNames[i]==mStr) 
					break;
				}
			mm = i;
		}
		dd = Number(s.substr(f.indexOf('dd'),2));
		d=new Date(yyyy, mm , dd);
		
		if(isNaN(d.getTime())){
			return false;
		}
		return d;
	};
	Date.todayExtend=function(){
		var data=new Date();
		var d=data.getDate();
		var m=data.getMonth();
		var y=data.getFullYear();
		var ext=d+" de "+Date.monthNames[m]+", "+y;
		return ext;
	};
	var _zeroPad=function(num){
		var s='0'+num;
		return s.substring(s.length-2);
	};
})();
