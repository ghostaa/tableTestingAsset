/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is an optimized version of Dojo, built for deployment and not for
	development. To get sources and documentation, please visit:

		http://dojotoolkit.org
*/

if(!dojo._hasResource["com.ibm.btt.util.I18nBundle"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.util.I18nBundle"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.util.I18nBundle");



dojo.declare("com.ibm.btt.util.I18nBundle", null,{
	
	bundle : null,
	
	constructor : function(/*String*/packageName, /*String*/bundleName, /*String?*/locale){
		try{
			dojo.requireLocalization(packageName, bundleName, locale, "");
			this.bundle =  dojo.i18n.getLocalization(packageName, bundleName, locale);
		}catch(e){
			console.info("Can not load NLS resources. packageName="+packageName+", bundleName="+bundleName+", locale="+locale);
			this.bundle = undefined;
		}
	},
	
	/**
	 * Sample 1, TRANSFER_WARNING: You can't transfer more than 3 times daily.
	 * Sample 2, TRANSFER_ERROR:Your {account} doesn't can't transfer value exceeds {amount}.
	 * @key key , like TRANSFER_WARNING, TRANSFER_ERROR
	 * @values , like ['2828 2323 8742 9876', '50000'] ; Or {name:"zhangjun", gender:"malel"} ; Or  "zhuangjun", male",...
	 * 
	 */
	getMessage : function(key, values){
		if (typeof (this.bundle) != "undefined" && typeof (key) != "undefined"
				&& typeof (this.bundle[key]) != "undefined") {
			if((values !== undefined) && (dojo.isArray(values))){	// pass in values is an array
				//Sample , TRANSFER_ERROR:Your {account} doesn't can't transfer value exceeds {amount}.
				//The result is replace value of account and amount.
				var text = this.bundle[key];
				var i = 0;   
				text = dojo.replace(text, dojo.hitch(values, function ( _ , k){
					if(i < values.length ) {
						if(values[i] !== undefined && values[i++] !== null) {
							return values[i - 1];
						}
					}
					return "{" + k + "}";
					
				}));
				
				return text;
			}else if (values !== undefined && values !== null && dojo.isObject(values)){
				
				return dojo.replace(this.bundle[key], dojo.hitch(values, function(_, k){ 
						var value = dojo.getObject(k, false, values);
						if(value !== null && value !== undefined) 
							return value;
						else 
							return "{" + k + "}";
							
					}));
					
			}else if(values !== undefined && values !== null) {
				var tempArray = [];
				for(var i = 1; i < arguments.length; i++) {
					tempArray.push(arguments[i]);
				}
				return arguments.callee.apply(this, [key, tempArray]);
			}else {
				return this.bundle[key];
			}
		} else {
			return undefined;
		}
	}
});

}

if(!dojo._hasResource["com.ibm.btt.util.I18nUtil"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.util.I18nUtil"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.util.I18nUtil");


(function(){ 
	I18nUtil = {
			/**
			 * This method is used to get the translated string through the inputed NLS key.
			 * It has four usages.
			 * 1. I18nUtil.getI18nString("%com.ibm.btt.nlsfile/test")
			 * 2. I18nUtil.getI18nString("%com.ibm.btt.nlsfile/test", {"name":"Jesse", "age":"20"});
			 * 3. I18nUtil.getI18nString("%com.ibm.btt.nlsfile/test", ["Jesse", "20"]);
			 * 4, I18nUtil.getI18nString("%com.ibm.btt.nlsfile/test", "Jesse", "20");
			 * 
			 * @key String
			 * @values Object or Array or multiple parameters
			 */
			getI18nString : function(key,values) {
				//assert for "",null,undefined value
				if( ( key === null) || (key === undefined) || ( key === "")){
					return key;
				} 
				var sc1 = "%";
				var sc2 = "/";
				key = key.toString();
				var temp = key.substring(0, 1);
				if (key.substring(0, 1) != sc1) {
					return key;
				} else {
					var sKey = key.replace(sc1, "");
					var tmp = sKey.split(sc2);
					var packageName = tmp[0].substring(0, tmp[0].lastIndexOf("."));
					var bundleName = tmp[0].substring(tmp[0].lastIndexOf(".") + 1,
							tmp[0].length);
					var keyName = tmp[1];
					if (typeof (packageName) == "undefined"
							|| typeof (bundleName) == "undefined" || packageName == ""
							|| bundleName == "") {
						return key;
					}
					//dojo.requireLocalization(packageName, bundleName, null, "");
					var bundle = new com.ibm.btt.util.I18nBundle(packageName,
							bundleName);
					//arguments[0] = keyName;
					var tmpMsg = bundle.getMessage(keyName, values);
					if (tmpMsg == undefined || tmpMsg == null) {
						return key;
					}else{
						return tmpMsg;
					}
				}
			}	
	};
})();

}

if(!dojo._hasResource["com.ibm.btt.util.StringUtil"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.util.StringUtil"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
 */

dojo.provide("com.ibm.btt.util.StringUtil");

(function() {
	StringUtil = {
		escapeHTML : function(htmlStr) {
			if (htmlStr) {
				var tmp_String = htmlStr.replace(new RegExp("\r\n", "g"), "\n");
				tmp_String = tmp_String.replace(new RegExp("\n", "g"), "<br/>");
				return StringUtil.replaceAll(tmp_String, " ", "&nbsp;");
			} else {
				return htmlStr;
			}

		},

		replaceAll : function(str, subStr, newSubStr) {
			if (str && subStr && newSubStr) {
				return str.replace(new RegExp(subStr, "gm"), newSubStr);
			} else {
				return str;
			}

		},

		removeWarp : function(str) {
			if (str) {
				var tmp_String = str.replace(new RegExp("\r", "g"), "");
				tmp_String = tmp_String.replace(new RegExp("\n", "g"), "");
				return tmp_String;
			} else {
				return str;
			}
		}
	};
})();

}

if(!dojo._hasResource["com.ibm.btt.dijit.AbstractWidgetMixin"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.AbstractWidgetMixin"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit.AbstractWidgetMixin"); 




dojo.declare("com.ibm.btt.dijit.AbstractWidgetMixin", null,{
	
	visibility : "visible",
	
	accessKey : "",
	
	hint : "",
	
	postCreate : function(){	
		this.applyAccessKey();
		this.inherited(arguments);
	},
	
	/**
	 * support the key is a template
	 * 
	 * @param key , defined in NLS cdd , LIKE Use %com.ibm.btt.nls.msg/transaction01.text as key of nls text.
	 * @paramvalues , dynamic values, the message should be a template like this : TRANSFER_ERROR:Your {account} doesn't can't transfer value exceeds {amount}. 
	 * Alpha developer can invoke the API like message1.display("TRANSFER_ERROR","ERROR", accountTextbox1.value, amounTextbox1.value);
	 * The dynamic values are [accountTextbox1.value,amounTextbox1.value] or {account:"4550 3588 5687 8554", amount:"5000"}
	 *
	 */
	getI18NString : function(key,values) {
				
		return I18nUtil.getI18nString(key, values);
		
	},
	
	replaceWrap : function(){
		
	},
	
	/**
	 * 
	 * hook method for Visibility attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setVisibilityAttr : function(value){
		this.visibility = value;
		if (value == "gone") {
			dojo.style(this.domNode, "visibility", "");
			dojo.style(this.domNode, "display", "none");
		} else if (value == "hidden") {
			dojo.style(this.domNode, "display", "");
			dojo.style(this.domNode, "visibility", "hidden");
		} else {
			dojo.style(this.domNode, "display", "");
			dojo.style(this.domNode, "visibility", "");
		}
	},
	
	/**
	 * 
	 * hook method for hint attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setHintAttr : function(value){
		this.hint = value;
		this.domNode.title = StringUtil.removeWarp(this.getI18NString(value));
	},
	
	isFocusable: function(){
		// Overridden so that when dijit is hidden, isFocusable return false;
		if(dojo.style(this.domNode, "visibility") == "hidden"){
			return false;
		} else if(this.disabled){
			return false;
		} else {
			return this.inherited(arguments);
		}
	},

	applyAccessKey : function() {
		if (this.focusNode && this.accessKey) {
			this.focusNode.setAttribute('accessKey', this.accessKey);
		}
	},
	
	handleLenUint : function(value) {
		var endWith = function(src, oString) {
			var reg = new RegExp(oString + "$");
			return reg.test(src);
		};
		if(endWith(value, "px") || endWith(value, "%") || endWith(value, "em")){
			return value;
		}else{
			return value + "px";
		}
	}
	
}); 
	

}

if(!dojo._hasResource["com.ibm.btt.dijit.Anchor"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.Anchor"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit.Anchor"); 


 
 

dojo.declare("com.ibm.btt.dijit.Anchor",[dijit._Widget,dijit._Templated,com.ibm.btt.dijit.AbstractWidgetMixin] ,{ 
	
	templateString : "<a class='dijitLabelBase' dojoAttachEvent='onclick:_onClick'></a>",
	
	action : "#",
	
	target : "_parent",
	
	bttParams : "",
	
	text : "",
	
	tabIndex: "0",
	
	disabled : false,
	
	width : "",
	
	height : "",
	
	textWrap : false,
	
	attributeMap: dojo.delegate(dijit._Widget.prototype.attributeMap, {
		target : {
			node : "domNode"
		},
		tabIndex : {
			node : "domNode"
		},
		text : {
			node : "domNode",
			type : "innerHTML"
		},
		visibility : {
			node : "domNode"
		},
		disabled : {
			node : "domNode"
		},
		action : {
			node : "domNode"
		}
	}),
	
	postCreate : function() {
		this.inherited(arguments);
	},
	
	/**
	 * 
	 * join btt params to a url
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_parameterHandler : function(e) {
		var paramString = "";
		var params = dojo.fromJson(e);
		for ( var paramName in params) {
			if (typeof (paramName) != "undefined") {
				var paramValue = params[paramName];
				if (paramString == "") {
					paramString += paramName + "=" + paramValue;
				} else {
					paramString += "&" + paramName + "=" + paramValue;
				}
			}
		}
		return paramString;
	},

	/**
	 * 
	 * hook method for action attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setActionAttr : function(value){
		this.action = value;
		var targetUrl = "";
		if (this.bttParams != "" && this.action != "" && this.action !== "#") {
			targetUrl = this.action;
			if (this.bttParams != "") {
				if (targetUrl.indexOf("?") == -1) {
					targetUrl += "?";
				}
				if (this.bttParams != "") {
					var params = this._parameterHandler(this.bttParams);
					if (targetUrl.substring(targetUrl.length - 1) == "?") {
						targetUrl += params;
					} else {
						targetUrl += "&" + params;
					}
				}
			}
		} else {
			targetUrl = "javascript:void(0)";
		}
		this.domNode.href = targetUrl;
	},
	
	/**
	 * 
	 * hook method for text attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setTextAttr : function(value){
		this.text = value;
		this.domNode.innerHTML = this.getI18NString(value);
	},
	
	/**
	 * 
	 * hook method for disable attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setDisabledAttr : function(value){
		this.disabled = value;
	},
	
	focus : function(){
		this.domNode.focus();
	},
	
	applyAccessKey : function(){
		if(this.accessKey){
			this.domNode.setAttribute('accessKey', this.accessKey);
		}
	},
	
	/**
	 * 
	 * override default onclick method to block default click when link is disabled
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_onClick : function(e){
		if (this.disabled || this.onClick(e) === false) {
			e.preventDefault();
		} 
	},
	
	onClick : function(e){
		//leave onClick event for customer to use.
	},
	
	/**
	 * 
	 * hook method for textWrap attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setTextWrapAttr : function(value) {
		this.textWrap = value;
		if (this.textWrap) {
			dojo.addClass(this.domNode, "dijitLabelWrap");
		} else {
			dojo.removeClass(this.domNode, "dijitLabelWrap");
		}
	},
	
	/**
	 * 
	 * hook method for width attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setWidthAttr : function(value){
		if(this.width != ""){
			this.width = value;
			dojo.style(this.domNode, "width", this.handleLenUint(this.width));
		}
	},
	
	/**
	 * 
	 * hook method for height attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setHeightAttr : function(value){
		if(this.height != ""){
			this.height = value;
			dojo.style(this.domNode, "height", this.handleLenUint(this.height));
		}
	}
}); 

}

if(!dojo._hasResource["com.ibm.btt.dijit.Button"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.Button"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit.Button");




dojo.declare("com.ibm.btt.dijit.Button", [ dijit.form.Button,
		com.ibm.btt.dijit.AbstractWidgetMixin], {
	
	bttParams : "",
	
	icon : "",
	
	text : "",
	
	/**
	 * This property indicates whether the button can be enable or disable when form valid status changes
	 * 
	 */	
	inValid : false,	
	
	width : "",
	
	height : "",
	
	textWrap : false,
		
	attributeMap: dojo.delegate(dijit.form.Button.prototype.attributeMap, {
		visibility : {
			node : "domNode"
		},
		text : {
			node : "textNode",
			type : "innerHTML"
		},
		icon : {
			node : "iconImageNode",
			type : "attribute",
			attribute : "src"
		},
		width : {
			node : "domNode"
		},
		height : {
			node : "domNode"
		}
	}),
	
	buildRendering : function(){
		this.inherited(arguments);
		this.iconImageNode = dojo.create("img", {'style':'display:none;'}, this.containerNode, "last");
		this.textNode = dojo.create("span", {'class':'dijitLabelBase'}, this.containerNode, "last");
		dojo.style(this.focusNode, 'overflow', 'hidden');
		dojo.addClass(this.focusNode.parentNode, "dijitLabelBase");
		
	},
	
	postCreate : function(){
		this.inherited(arguments);
		this._setIconAttr(this.icon); //add to fix the icon display error for IE6
	},
	
	/**
	 * 
	 * hook method for text attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setTextAttr : function(value) {
		this.text = value;
		this.textNode.innerHTML = this.getI18NString(value);
	},
	
	/**
	 * 
	 * hook method for textWrap attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setTextWrapAttr : function(value) {
		this.textWrap = value;
		if (this.textWrap) {
			dojo.addClass(this.textNode, "dijitLabelWrap");
		} else {
			dojo.removeClass(this.textNode, "dijitLabelWrap");
		}
	},
	
	/**
	 * 
	 * hook method for icon attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setIconAttr : function(value){
		this.icon = value;
		this.iconImageNode.src = value;
		if (value === "" || typeof (value) === "undefined") {
			dojo.style(this.iconImageNode,"display","none");
		}
		else{
			dojo.style(this.iconImageNode,"display","");
		}
	},
	
	/**
	 * 
	 * hook method for width attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setWidthAttr : function(value) {
		if (value != "") {
			this.width = value;
			dojo.style(this.focusNode.parentNode,"width", this.handleLenUint(this.width));
		}
	},
	
	/**
	 * 
	 * hook method for height attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setHeightAttr : function(value) {
		if (value != "") {
			this.height = value;
			dojo.style(this.focusNode.parentNode,"height", this.handleLenUint(this.height));
		}		
	},
	
	/**
	 * 
	 * hook method for inValid attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setInValidAttr : function(value){
		
		this.inValid = value;
		
		if (this.type == "submit") {
			var form = this._getParentForm();
			if (form && form.setSubmitButtonState) {
				form.setSubmitButtonState();
			} else {
				this.set("disabled", value);
			}
		} else {
			this.set("disabled", value);
		}
		
	},
	
	
	/**
	 * 
	 * override default button click mehtod to support canle and save type button
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_onButtonClick : function(e){
		var form = this._getParentForm();
		if(form && this.get("disabled") == false && this.type == "cancel"){
			this._onClick(e);
			this._doCancelAction(form);
			e.preventDefault();
		}else if(form && this.get("disabled") == false && this.type == "save"){
			this._onClick(e);
			this._doSaveAction(form);
			e.preventDefault();
		}else{
			if(form){
				form._lastClickedButton = this;
			}
			this.inherited(arguments);
		}
		
	},
	
	/**
	 * 
	 * get the the parent form container which this button in
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_getParentForm : function(){
		for(var node=this.domNode; node.parentNode/*#5935*/; node=node.parentNode){
			var widget=dijit.byNode(node);
			if(widget && typeof widget._onSubmit == "function"){
				return widget;
			}
		}
	},
	
	/**
	 * 
	 * handle the cancel action when button is cancel type
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_doCancelAction : function(form){
		var form = this._createHiddenForm(form, dojo.fromJson(this.bttParams));
		form.submit();
	},
	
	/**
	 * 
	 * handle save action whne button is save type
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_doSaveAction : function(form){
		var form = this._getParentForm();
		if(form.onFormSubmit){
			form.onFormSubmit();
		}
		var formValue = form.get('validValue');
		var form = this._createHiddenForm(form, dojo.mixin(formValue, dojo.fromJson(this.bttParams)));
		form.submit();
	},

	/**
	 * 
	 * create hidden filed to submit data
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_createHiddenForm : function(form, params){
		var form = dojo.create("form", {
				'style' : 'display:none;',
				'action' : form.get('action'),
				'method' : form.get('method')
			}, dojo.body(), 'last');
		var plainKeyValue = [];
		for(var name in params){
			if (name != undefined && name != null && name != "") {
				plainKeyValue = plainKeyValue.concat(this._convertToKeyValuePair(name, params[name]));
			}
		}
		
		for(var i=0;i<plainKeyValue.length;i++){
			dojo.create("input", {
				'type' : 'hidden',
				'name' : plainKeyValue[i].key,
				'value' : plainKeyValue[i].value
			}, form, "last");
		}
		
		return form;
	},
	
	/**
	 * 
	 * convert object data to plain key value pair data
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_convertToKeyValuePair : function(name, value){
		var res = [];
		if (dojo.isObject(value)) {
			for(var key in value){
				if (key != undefined && key != null && key != "") {
					res = res.concat(this._convertToKeyValuePair(name+"."+key, value[key]));
				}
			}
		} else if (dojo.isArray(value)) {
			for ( var i = 0; i < value.length; i++) {
				res = res.concat(this._convertToKeyValuePair(name+"."+i, value[i]));
			}
		} else {
			res.push( {
				'key' : name,
				'value' : value
			});
		}
		return res;
	}
});

}

if(!dojo._hasResource["com.ibm.btt.dijit.CheckBox"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.CheckBox"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit.CheckBox");




dojo.declare("com.ibm.btt.dijit.CheckBox", [ dijit.form.CheckBox, com.ibm.btt.dijit.AbstractWidgetMixin], {

	text : "",
	
	visibility : "visible",
	
	uncheckedField : null,

	checkedValue : "true",

	unCheckedValue : "false",
	
	isChecked : false,
	
	checked : "",
	
	width : "",
	
	height : "",
	
	textWrap : false,
	
	attributeMap : dojo.delegate(dijit.form.CheckBox.prototype.attributeMap, {
		
		isChecked : {
			node : "domNode",
			type : "attribute"
		},

		style : {
			node : "labelNode",
			type : "attribute"
		},
		
		visibility : {
			node : "domNode"
		},
		
		text : {
			node : "labelNode",
			type : "innerHTML"
		}
	}),

	postMixInProperties: function(){
		if(this.isChecked==true){
			this.checked = "checked";
			this.params.checked = "checked";
		}
		this.inherited(arguments);
	},
	
	create : function() {
		this.labelNode = dojo.create("label", {'class':'dijitLabelBase'}, this.domNode, "after");
		//this.labelNode.innerHTML = this.getI18NString(this.text);
		this.inherited(arguments);
		this.labelNode.htmlFor = this.id;
		dojo.place(this.labelNode,this.domNode,"after");
		this.set("visibility", this.visibility);
	},

	postCreate : function() {
		this.inherited(arguments);
		this._setSubmitValue();
		this.set('value', this.checkedValue);
		
		if (this.width && this.width != "") {
			this.set("width", this.width);
		}
		if (this.height && this.height != "") {
			this.set("height", this.height);
		}
	},

	setUncheckedValue : function(arg) {
		if(!this.get('name')){
			//never use uncheckedField if name is null or '', as this field will not be submitted
			return;
		}
		if (arg == true) {
			if (this.uncheckedField == null) {
				this.uncheckedField = dojo.create("input", {
					type : 'hidden',
					value : this.unCheckedValue,
					name : this.get('name')
				});
			}
			dojo.place(this.uncheckedField, this.focusNode, "after");
		} else {
			if (this.uncheckedField != null) {
				dojo.destroy(this.uncheckedField);
			}
		}
	},
	
	/**
	 * 
	 * hook method for Visibility attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	// fix for JR41345, remove focused style for empty label
	_onFocus: function(){
		this.inherited(arguments);
		if(!this.text || this.text === "" || this.text === null ){
			dojo.query("label[for='"+this.id+"']").removeClass("dijitFocusedLabel");
		}
	},
	
	/**
	 * 
	 * set the value before submit the data to server
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setSubmitValue : function(){
		if (this.get("isChecked")) {
			this.setUncheckedValue(false);
		} else {
			this.setUncheckedValue(true);
		}
	},
	
	/**
	 * 
	 * hook method for isChencked attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setIsCheckedAttr : function(value){
		this.set("checked", value);
	},
	
	/**
	 * 
	 * hook method for checked attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setCheckedAttr : function(value){
		if (value == false || value == "false" || value == "") {
			this.isChecked = false;
		}else {
			this.isChecked = true;
		}
		this._setSubmitValue();
		this.inherited(arguments);
	},
	
	/**
	 * 
	 * hook method for text attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setTextAttr : function(value){
		this.text = value;
		this.labelNode.innerHTML = this.getI18NString(value);
	},
	
	/**
	 * 
	 * hook method for style attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setStyleAttr : function(value){
		dojo.attr(this.labelNode, "style", value);
	},
	
	/**
	 * 
	 * hook method for class attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setClassAttr : function(value){
		dojo.attr(this.labelNode, "class", value);
	},
	
	/**
	 * 
	 * hook method for hint attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setHintAttr : function(value){
		this.hint = value;
		var tmpVal = StringUtil.removeWarp(this.getI18NString(value));
		this.domNode.title = tmpVal;
		this.labelNode.title = tmpVal;
	},
	
	/**
	 * 
	 * hook method for Visibility attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setVisibilityAttr : function(value){
		this.visibility = value;
		if (value === "gone") {
			dojo.style(this.domNode, "visibility", "visible");
			dojo.style(this.domNode, "display", "none");
			
			dojo.style(this.labelNode, "visibility", "visible");
			dojo.style(this.labelNode, "display", "none");
		} else if (value === "hidden") {
			dojo.style(this.domNode, "display", "");
			dojo.style(this.domNode, "visibility", "hidden");
			
			dojo.style(this.labelNode, "display", "");
			dojo.style(this.labelNode, "visibility", "hidden");
		} else {
			dojo.style(this.domNode, "display", "");
			dojo.style(this.domNode, "visibility", "visible");
			
			dojo.style(this.labelNode, "display", "");
			dojo.style(this.labelNode, "visibility", "visible");
		}
	},
	
	/**
	 * 
	 * hook method for readOnly attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setReadOnlyAttr: function(/*Boolean*/ value){
		this.inherited(arguments);
		if (value === "true" || value === true) {
			this.labelNode.htmlFor = "";
		}
		else{
			this.labelNode.htmlFor = this.id;
		}
	},
	
	/**
	 * 
	 * hook method for disabled attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setDisabledAttr : function(value){
		this.inherited(arguments);
		if(this.uncheckedField!=null){
			dojo.attr(this.uncheckedField, 'disabled', value);
		}
	},
	
	/**
	 * 
	 * hook method for value attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_getValueAttr : function(){
		if(this.isChecked){
			return this.checkedValue;
		}else{
			return this.unCheckedValue;
		}
	},
	
	/**
	 * 
	 * hook method for textWrap attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setTextWrapAttr : function(value) {
		this.textWrap = value;
		if (this.textWrap) {
			dojo.addClass(this.labelNode, "dijitLabelWrap");
		} else {
			dojo.removeClass(this.labelNode, "dijitLabelWrap");
		}
	},
	
	/**
	 * 
	 * hook method for width attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setWidthAttr : function(value){
		if(this.width != ""){
			this.width = value;
			
			var width = value.replace(new RegExp("px", "gm"), "");
			try{
				width = Number(width);
			} catch(e) {
				console.error("Illegal input argument. Can not convert input width:"+ value +" to number.");
				return;
			}
			var box = dojo.marginBox(this.domNode);
			var labelWidth = width - box.w;
			if(labelWidth<0){
				labelWidth = 0;
			}
			dojo.style(this.labelNode, "width", labelWidth + "px");
		}
	},
	
	/**
	 * 
	 * hook method for height attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setHeightAttr : function(value){
		if(this.height != ""){
			this.height = value;
			var height = value.replace(new RegExp("px", "gm"), "");
			try{
				height = Number(height);
			} catch(e) {
				console.error("Illegal input argument. Can not convert input height:"+ value +" to number.");
				return;
			}
			var box = dojo.marginBox(this.domNode);
			var labelHeight = height - box.h;
			if(labelHeight<0){
				labelHeight = 0;
			}
			dojo.style(this.labelNode, "height", labelHeight + "px");
		}
	},
	
	destroy : function(){
		this.inherited(arguments);
		dojo.destroy(this.labelNode);
		this.labelNode = null;
	}
});

}

if(!dojo._hasResource["com.ibm.btt.dijit.ValidationTextBox"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.ValidationTextBox"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/


dojo.provide("com.ibm.btt.dijit.ValidationTextBox"); 




dojo.requireLocalization("com.ibm.btt.dijit", "TextBox", null, "ROOT");

dojo.declare("com.ibm.btt.dijit.ValidationTextBox",[dijit.form.ValidationTextBox,
                                                    com.ibm.btt.dijit.AbstractWidgetMixin ],{
	
	width : "",
	
	errorDisplayer : null,
	
	singleFieldErrorMessage : "",
	
	attributeMap: dojo.delegate(dijit.form.ValidationTextBox.prototype.attributeMap, {
		
		visibility : {
			node : "domNode"
		},
		
		width : {
			node : "domNode"
		}
		
	}),
	
	postMixInProperties : function(){
		this.inherited(arguments);
		this.bundle = new com.ibm.btt.util.I18nBundle("com.ibm.btt.dijit", "TextBox");
	},
	
	startup : function() {
		this.inherited(arguments);
		if(this.singleFieldErrorMessage) {
			try {
				var errorMessageArray = dojo.fromJson(this.singleFieldErrorMessage);
				if(dojo.isArray(errorMessageArray)) {
					this.showErrorMessage(errorMessageArray);
				}	
			}catch(e) {
				this.showErrorMessage(this.singleFieldErrorMessage);
			}
		}
	},
	
	validator: function(/*anything*/value, /*dijit.form.ValidationTextBox.__Constraints*/constraints){
		var result = typeof(this.regExpGen(constraints))!="undefined" && this.testRegularExpression(this.regExpGen(constraints), value);
		if(!result) {
			this.invalidMessage = this.bundle.getMessage("regularExpressionMessage");
			return false;
		}else{
			var res = (!this.required || !this._isEmpty(value)) &&
                (this._isEmpty(value) || this.parse(value, constraints) !== undefined); // Boolean
            if(res){
            	return true;
            }else{
            	this.invalidMessage = this.bundle.getMessage("invalidMessage");
            	return false;
            }
        }
	},
	
	testRegularExpression : function(reg, value){
		return (new RegExp("^(?:" + reg + ")"+(this.required?"":"?")+"$")).test(value);
	},
	
	/**
	 * 
	 * hook method for width attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setWidthAttr : function(value) {
		if (value != "") {
			this.width = value;
			dojo.style(this.domNode, "width", this.handleLenUint(this.width));
		}
	},
	
	/**
	 * 
	 * hook method for Visibility attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setVisibilityAttr : function(value){
		this.visibility = value;
		var iconNode;
		if (typeof (this.domNode.children[0]) != "undefined"
				&& typeof (this.domNode.children[0].children[0]) != "undefined") {
			iconNode = this.domNode.children[0].children[0];
		} else {
			iconNode = null;
		}
		if (value == "gone") {
			dojo.style(this.domNode, "visibility", "visible");
			dojo.style(this.domNode, "display", "none");
			if (iconNode != null) {
				dojo.style(iconNode, "visibility", "");
			}
		} else if (value == "hidden") {
			dojo.style(this.domNode, "display", "");
			dojo.style(this.domNode, "visibility", "hidden");
			if (iconNode != null) {
				dojo.style(iconNode, "visibility", "hidden");
			}
		} else {
			dojo.style(this.domNode, "display", "");
			dojo.style(this.domNode, "visibility", "visible");
			if (iconNode != null) {
				dojo.style(iconNode, "visibility", "");
			}
		}
	},
	
	_onFocus: function(/*String*/ by) {
		this.onShowErrorFlag=false;
		if(this.errorDisplayer) this.errorDisplayer.hide(this.domNode);
		this.inherited(arguments);
	},
	
	
	onShowErrorFlag : false,
	showErrorMessage: function(/*String*/ message){
		
		if(dojo.isArray(message)) {
			var nlsMessageArray = [];
			for(var i = 0; i < message.length; i ++) {
				var tempMessage = this.getI18NString(message[i]);
				if(tempMessage == null) tempMessage = message[i];
				nlsMessageArray.push(tempMessage);
			}
			if(nlsMessageArray.length != 0) {
				var nlsMsg = nlsMessageArray.join(" ");
			} else {
				var nlsMsg = "";
			}
		} else {
			var  args=[];
			var  values=[];
			if (arguments.length==0){
				arguments[0]="";
				message="";
			}
			
			for (var i=1;i<arguments.length; i++ ){
				values[i-1]=arguments[i];
			}	
			args[0]=arguments[0];
			args[1]=values;
			args[2]=true;
			var nlsMsg=this.getI18NString.apply(this,args );	
			if (nlsMsg==null) nlsMsg=message;
		}
			
		 if (message!=""){
			// if(this._message == message){ return; }
			 this._message = message;
			 dijit.hideTooltip(this.domNode);
			 //This line is used to fix PMR JR41644, 
			 //set cursor to current textBox when show error message toolTip beside textBox
			 //this.focus();
			 dojo.window.scrollIntoView(this.focusNode);
			 
			 this.onShowErrorFlag=true;
			 if(!this.errorDisplayer)  
				 this.errorDisplayer = new dijit._MasterTooltip();		
			 this.errorDisplayer.show( nlsMsg , this.domNode, this.tooltipPosition, !this.isLeftToRight());	
		 }
		 else {
			 this.onShowErrorFlag=false;
			 if(this.errorDisplayer) 
					this.errorDisplayer.hide(this.domNode);
		 }
			
		 this._refreshState();
	},
	// override
	validate: function( isFocused){ 
	
		if (this.onShowErrorFlag){ //mask warnings
			
			this.state = "Error" ; 
			this._setStateClass();
			dijit.setWaiState(this.focusNode, "invalid", false ? "false" : "true");
			if(isFocused){
				if(this.state == "Error"){
					message = this.getErrorMessage(true);
				}else{
					message = this.getPromptMessage(true); // show the prompt whever there's no error
				}
				this._maskValidSubsetError = true; // since we're focused, always mask warnings
			}
			//this.displayMessage(message);  // not show internal error message, just mask ! warnings only
			return false; 
		}else
			return this.inherited(arguments);
	},
	
	destroy : function(){
		this.displayMessage("");
		if(this.errorDisplayer){
			this.errorDisplayer.hide(this.domNode);
		}
		this.inherited(arguments);
		if(this.errorDisplayer){
			this.errorDisplayer.destroy();
			this.errorDisplayer = undefined;
		}
	}

});

dojo.declare("com.ibm.btt.dijit.MappedTextBox",[com.ibm.btt.dijit.ValidationTextBox,dijit.form.MappedTextBox],{});

dojo.declare("com.ibm.btt.dijit.RangeBoundTextBox",[com.ibm.btt.dijit.MappedTextBox,dijit.form.RangeBoundTextBox],{
	
	postMixInProperties : function(){
		this.inherited(arguments);
		this.bundle = new com.ibm.btt.util.I18nBundle("com.ibm.btt.dijit", "TextBox");
	},
	
	rangeCheck: function(/*Number*/ primitive, /*dijit.form.RangeBoundTextBox.__Constraints*/ constraints){	
		if("min" in constraints && this.compare(primitive,constraints.min) < 0){
			this.rangeMessage = this.bundle.getMessage("rangeMinMessage",{value:constraints.min});
			return false;
		}
		if("max" in constraints && this.compare(primitive,constraints.max) > 0){
			this.rangeMessage = this.bundle.getMessage("rangeMaxMessage",{value:constraints.max});
			return false;
		}
		return true;
	}

});

}

if(!dojo._hasResource["com.ibm.btt.dijit.ComboBox"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.ComboBox"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit.ComboBox");






dojo.declare("com.ibm.btt.dijit.ComboBox",[com.ibm.btt.dijit.ValidationTextBox,dijit.form.ComboBox,com.ibm.btt.dijit.AbstractWidgetMixin],{
	
	storeDataName : "",
	
	storeData : "",
	
	storeURL : "",	
	
	labelField : "label",
	
	storeDataFormat : {itemLabel:this.labelField},
	
	asyncStatus : 0,
	
	asyncErrorMessage : "",	
	
	constructor : function() {
		
		this.storeDataFormat = {itemLabel:"label"};
		
		this.searchAttr = this.storeDataFormat.itemLabel;
		
	},	
	
	attributeMap: dojo.delegate(dijit.form.ComboBox.prototype.attributeMap, {
		
		visibility : {
			node : "domNode"
		}
	
	}),
	
	postMixInProperties: function(){
		this.storeDataFormat.itemLabel = this.labelField;
		this.searchAttr = this.storeDataFormat.itemLabel;
	
		var root = this.srcNodeRef;
		
		var dataObj = {label: this.storeDataFormat.itemLabel, items: []};
		
		var labelName = this.storeDataFormat.itemLabel;
		
		var scope = this;
		dojo.query("> option", root).forEach(function(node){
			
			var item = {};
			
			item[labelName] = scope.getI18NString(dojo.trim(node.innerHTML));
			
			dataObj.items.push(item);
			
		});
		
		if(dataObj.items.length == 0) {
			if(this.storeData) {
				var tmpValue = dojo.fromJson(this.storeData);
				dataObj = this._formatStoreData(tmpValue);
			}
		}
		
		this.store = new dojo.data.ItemFileReadStore({data:dataObj});
		
		this.inherited(arguments);
		
	},
	
	postCreate: function(){
		
		this.inherited(arguments);
		
		if(!this.storeDataName && this.storeURL) {
		
			this.loadStoreFromURL(this.storeURL);
			
		}
	},	

	setStoreData : function(data) {
		
		var data = this._formatStoreData(data);
		this.store.clearOnClose = true;
		this.store.data = data;
		this.store._jsonData = null;
		this.store.close();
		
	},
	
	/**
	 * 
	 * convert object or array data to data store format data
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_formatStoreData : function(data) {
		
		var resData = {label:this.storeDataFormat.itemLabel, items:[]};
		if(data instanceof Array ) {
			for(var i = 0; i < data.length; i ++) {
				if(data[i] != null) {
					var item = {};
					if(dojo.isObject(data[i])) {
						if(data[i][resData.label] != null) {
							item[resData.label] = this.getI18NString(data[i][resData.label]);
						}
					} else if(dojo.isString(data[i])) {
						item[resData.label] = this.getI18NString(data[i]);
					} else {
						item[resData.label] = data[i].toString();
					}
					if(item[resData.label])
						resData.items.push(item);
				}
			}

		} else if (data instanceof Object) {
			for(var p in data) {
				var item = {};
				item[resData.label] = this.getI18NString(p);
				resData.items.push(item);
			}
		}
		
		return resData;
	},
	
	/**
	 * 
	 * error handling method for loading data with xhr 
	 * 
	 * @tag private this is a internal property, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_handleStoreLoadingError : function(err) {
		
		if(err.status !== undefined)
		{				
			this.asyncStatus = err.status;
			this.asyncErrorMessage = err.message;
			this.onAsyncError();
		}
		
	},
	
	onAsyncOK : function() {
		
	},

	onAsyncError : function() {
		
	},
		
	loadStoreFromURL : function(url) {
		
		this.storeURL = url;
		
		var xhrArgs = {
			url:this.storeURL,
			handleAs: "json",
			load: dojo.hitch(this, "_handleStoreLoadingResponse"),
    		error: dojo.hitch(this, "_handleStoreLoadingError")
         };
		
	    this.asyncStatus = 0;
	    this.asyncErrorMessage = "";    
	    dojo.xhrGet(xhrArgs);
	},
	
	/**
	 * 
	 * handle loading data xhr response
	 * 
	 * @tag private this is a internal property, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_handleStoreLoadingResponse : function(data) {
		
		this.setStoreData(data);
		this.onAsyncOK();
		
	},	
	
	/**
	 * 
	 * hook method for Visibility attribute
	 * 
	 * @tag private this is a internal property, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setVisibilityAttr : function(value){
		this.visibility = value;
		var iconNode;
		if (typeof (this.domNode.children[0]) != "undefined"
				&& typeof (this.domNode.children[0].children[1]) != "undefined") {
			iconNode = this.domNode.children[0].children[1];
		} else {
			iconNode = null;
		}
		if (value == "gone") {
			dojo.style(this.domNode, "visibility", "visible");
			dojo.style(this.domNode, "display", "none");
			if (iconNode != null) {
				dojo.style(iconNode, "visibility", "");
			}
		} else if (value == "hidden") {
			dojo.style(this.domNode, "display", "");
			dojo.style(this.domNode, "visibility", "hidden");
			if (iconNode != null) {
				dojo.style(iconNode, "visibility", "hidden");
			}
		} else {
			dojo.style(this.domNode, "display", "");
			dojo.style(this.domNode, "visibility", "visible");
			if (iconNode != null) {
				dojo.style(iconNode, "visibility", "");
			}
		}
	}	
	
});

}

if(!dojo._hasResource["com.ibm.btt.dijit.NumberTextBox"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.NumberTextBox"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit.NumberTextBox");





dojo.declare("com.ibm.btt.dijit.NumberTextBox",[com.ibm.btt.dijit.RangeBoundTextBox,dijit.form.NumberTextBox],{
	
	numberType : "",

	minimumNumber : NaN,

	maximumNumber : NaN,

	locale : dojo.locale,

	pattern : "",

	decimalPlaces : 0,
	
	postMixInProperties : function(){
		
		this.inherited(arguments);
		
		if (this.numberType == "byte" || this.numberType == "int"
			|| this.numberType == "short" || this.numberType == "integer"
			|| this.numberType == "long" || this.numberType == "bigInteger") {
			this.fractional = false;
		} else {
			this.fractional = true;
		}
		
		if (!isNaN(this.minimumNumber)) {
			if (this.fractional) {
				this.constraints.min = Number(this.minimumNumber);
			} else {
				this.constraints.min = parseInt(this.minimumNumber);
			}
		}
		
		if (!isNaN(this.maximumNumber)) {
			if (this.fractional) {	
				this.constraints.max = Number(this.maximumNumber);	
			} else {
				this.constraints.max = parseInt(this.maximumNumber);
			}
		}
		
		this.constraints.locale = this.locale;
		
		if (this.pattern != "") {
			this.constraints.pattern = this.pattern;
		}
		
		this.constraints.fractional = this.fractional;
		
		if(!isNaN(this.decimalPlaces)){
			this.decimalPlaces = Number(this.decimalPlaces);
		}
		
		if (this.fractional && this.decimalPlaces > 0) {
			this.constraints.places = this.decimalPlaces;
		}
		
		this.bundle = new com.ibm.btt.util.I18nBundle("com.ibm.btt.dijit", "TextBox");
		
	},
	
	isNumber : function(value){
		return /^-?\d+(\.\d+)?$/.test(value);
	},
	
	validator : function(/* anything */value, /* dijit.form.ValidationTextBox.__Constraints */
			constraints) {
		
		var formattedValue;
		if(this.isNumber(value)){
			formattedValue = value;
		}
		else{
			formattedValue = this.parse(value, this.constraints);
			if (!this.isNumber(formattedValue) && value != "") {
				this.invalidMessage = this.bundle.getMessage("invalidMessage");
				return false;
			}else{
				if (new RegExp("^[+-]?\\d+$").test(formattedValue) && this.decimalPlaces > 0) {
					var con = {};
					con["max"] = this.constraints["max"];
					con["min"] = this.constraints["min"];
					con["places"] = this.constraints["places"];
					con["fractional"] = this.constraints["fractional"];
					con["locale"] = this.constraints["locale"];
					formattedValue += ".";
					for(var i=0;i<this.decimalPlaces;i++){
						formattedValue += "0";
					}
				}
			}
		}

		if (this.isNumber(formattedValue) && this.fractional && this.decimalPlaces>0 && !(new RegExp("^[+-]?.+[.,]\\d{" + this.decimalPlaces + "}$").test(value))){
			this.invalidMessage = this.bundle.getMessage("decimalPlacesMessage",{value : this.decimalPlaces});
			return false;
		}
		
		if (this.isNumber(formattedValue) && this.numberType == "byte" && (formattedValue > 127 || formattedValue < -128)) {
			this.invalidMessage = this.bundle.getMessage("intOutOfRange",{max:127,min:-128});
			return false;
		}
		if (this.isNumber(formattedValue) && this.numberType == "short" && (formattedValue > 32767 || formattedValue < -32768)) {
			this.invalidMessage = this.bundle.getMessage("intOutOfRange",{max:32767,min:-32768});
			return false;
		}
		if (this.isNumber(formattedValue) && this.numberType == "int" && (formattedValue > 2147483647
				|| formattedValue < -2147483648)) {
			this.invalidMessage = this.bundle.getMessage("intOutOfRange",{max:2147483647,min:-2147483648});
			return false;
		}
		if (this.isNumber(formattedValue) && this.numberType == "integer" && (formattedValue > 2147483647
				|| formattedValue < -2147483648)) {
			this.invalidMessage = this.bundle.getMessage("intOutOfRange",{max:2147483647,min:-2147483648});
			return false;
		}
		if (this.isNumber(formattedValue) && this.numberType == "long" && (formattedValue > 9223372036854775807
				|| formattedValue < -9223372036854775808)) {
			this.invalidMessage = this.bundle.getMessage("intOutOfRange",{max:9223372036854775807,min:-9223372036854775808});
			return false;
		}
		if (formattedValue.toString().replace(new RegExp(".", "g"), "").length > 16) {
			this.invalidMessage = this.bundle.getMessage("numberOutOfRange");
			return false;
		}
		return this.inherited(arguments);
	},
	
	/**
	 * 
	 * hook method for value attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setValueAttr: function(/*Number*/ value, /*Boolean?*/ priorityChange, /*String?*/formattedValue){
		if(typeof value === "string" && value !== "") {
			var tmpValue = Number(value);
			if(isNaN(tmpValue) && value && value != ""){
				var cons = {};
				if(this.constraints['pattern']){
					cons['pattern'] = this.constraints['pattern'];
				}
				value = this.parse(value, cons);
			} else {
				value = tmpValue;
			}
		}
		this.inherited(arguments);
	},
	
	create: function(/*Object?*/params, /*DomNode|String?*/srcNodeRef){
		
		this.inherited(arguments);
		
		var value = dojo.attr(srcNodeRef, 'value');
		
		if(value && value != ""){
			var cons = {};
			if(this.constraints['pattern']){
				cons['pattern'] = this.constraints['pattern'];
			}
			params.value = this.parse(value, cons);
			if(isNaN(params.value)){
				params.value = Number(value);
			}
			this.set('value', params.value);
		}
		
	},
	
	serialize: function(/*anything*/val, /*Object?*/options){
		return this.format(val, options);
	}
	
});

}

if(!dojo._hasResource["com.ibm.btt.dijit.CurrencyTextBox"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.CurrencyTextBox"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit.CurrencyTextBox");




dojo.declare("com.ibm.btt.dijit.CurrencyTextBox", [
		com.ibm.btt.dijit.NumberTextBox, dijit.form.CurrencyTextBox ], {
	
	decimalPlaces : 0,
	
	postMixInProperties : function(){
		this.inherited(arguments);
		this.decimalPlaces = this.constraints.places;
	},
	
	serialize: function(/*anything*/val, /*Object?*/options){
		return isNaN(val) ? "" : (val.toString ? val.toString() : "");
	}
	
});

}

if(!dojo._hasResource["com.ibm.btt.dijit.DateTextBox"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.DateTextBox"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit.DateTextBox");





dojo.declare("com.ibm.btt.dijit.DateTextBox", [com.ibm.btt.dijit.RangeBoundTextBox, dijit.form.DateTextBox], {

	maximumDate : "",

	minimumDate : "",

	locale : dojo.locale,

	pattern : "",

	postMixInProperties : function() {
		this.inherited(arguments);
		this.lang = this.locale;
		this.constraints.locale = this.locale;
		if (this.minimumDate != "") {
			if (this.isToday(this.minimumDate)) {
				this.constraints.min = this.parseToday(this.minimumDate);
			} else {
				this.constraints.min = dojo.date.stamp
						.fromISOString(this.minimumDate);
			}
		}
		if (this.maximumDate != "") {
			if (this.isToday(this.maximumDate)) {
				this.constraints.max = this.parseToday(this.maximumDate);
			} else {
				this.constraints.max = dojo.date.stamp
						.fromISOString(this.maximumDate);
			}
		}
		if (this.pattern != "") {
			this.constraints.datePattern = this.pattern;
		}
	},

	create: function(/*Object?*/params, /*DomNode|String?*/srcNodeRef){
		if(params.value==null){
			if(srcNodeRef.value!=null && srcNodeRef.value!="" &&  params.pattern!=null && params.pattern!=""){
				try{
					var option = {
						selector:"date",
						datePattern:params.pattern,
						fullYear:true
					};
					var val = dojo.date.locale.parse(srcNodeRef.value,option);
					params.value = val;
				}
				catch(e){
					
				}
			}
		}
		this.inherited(arguments);
	},
	
	serialize: function(/*anything*/val, /*Object?*/options){
		if (val.toGregorian) {
			val = val.toGregorian();
		}
		if (this.pattern != "") {
			return this.format(val, options);
		} else {
			return dojo.date.stamp.toISOString(val, options);
		}
	},
	
	isToday : function(value) {
		if (value.replace(" ", "").toLowerCase().indexOf("today") > -1) {
			return true;
		} else {
			return false;
		}
	},

	parseToday : function(value) {
		var srcValue = value.replace("today", "");
		var type = "";
		var year = 0;
		var month = 0;
		var day = 0;
		var rightNow = new Date();
		rightNow.setHours(0);
		rightNow.setMinutes(0);
		rightNow.setSeconds(0);
		rightNow.setMilliseconds(0);
		if (srcValue.indexOf("+") > -1) {
			type = "plus";
			srcValue = srcValue.replace("+", "#");
		}
		if (srcValue.indexOf("-") > -1) {
			type = "sub";
			srcValue = srcValue.replace("-", "#");
		}
		if (srcValue.indexOf("y") > -1) {
			year = srcValue.substring(srcValue.lastIndexOf("#") + 1, srcValue
					.indexOf("y"));
			srcValue = srcValue.replace("y", "#");
		}
		if (srcValue.indexOf("m") > -1) {
			month = srcValue.substring(srcValue.lastIndexOf("#") + 1, srcValue
					.indexOf("m"));
			srcValue = srcValue.replace("m", "#");
		}
		if (srcValue.indexOf("d") > -1) {
			day = srcValue.substring(srcValue.lastIndexOf("#") + 1, srcValue
					.indexOf("d"));
		}
		if ("plus" == type) {
			rightNow = dojo.date.add(rightNow, "year", +year);
			rightNow = dojo.date.add(rightNow, "month", +month);
			rightNow = dojo.date.add(rightNow, "day", +day);
		} else {
			rightNow = dojo.date.add(rightNow, "year", -year);
			rightNow = dojo.date.add(rightNow, "month", -month);
			rightNow = dojo.date.add(rightNow, "day", -day);
		}
		return rightNow;
	},
	
	/**
	 * 
	 * hook method for value attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setValueAttr: function(/*Date*/ value, /*Boolean?*/ priorityChange, /*String?*/ formattedValue){
		
		if (typeof (value) == "string" || value instanceof String) {
			var val = null;
			if (this.pattern == "") {
				value = dojo.date.stamp.fromISOString(value);
			} else {
				var option = {
					selector : "date",
					datePattern : this.pattern,
					fullYear : true
				};
				value = dojo.date.locale.parse(value, option);
			}
		}

		this.inherited(arguments);

	},
	
	_getValueAttr : function(){
		if(this.textbox.value == ""){
			return null;
		} else {
			return this.inherited(arguments);
		}
	}
});

}

if(!dojo._hasResource["com.ibm.btt.util.AjaxUtil"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.util.AjaxUtil"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
 */

dojo.provide("com.ibm.btt.util.AjaxUtil");

(function(){
	
	AjaxUtil = {
		
		ajaxOperationUrl : "Ajax",
		
		constants : {
			"BTT_OPERATIONNAME" : "dse_operationName", 
			"BTT_PAGEID" : "dse_pageId", 
			"BTT_SESSIONID" : "dse_sessionId", 
			"BTT_ERRORPAGE" : "dse_errorPage", 
			"BTT_PROCESSORID" : "dse_processorId"
		},
		
		xhrPost : function(request, data) {
			
			request.postData = dojo.toJson(data);
			
			if (typeof request.url == 'undefined') {
				request.url = this.ajaxOperationUrl;
			}
			if (typeof request.handleAs == 'undefined') {
				request.handleAs = "text";
			}
			if (typeof request.success == 'undefined') {
				request.load = function(e) {
					console.info("Ajax request response from ajax channel. " + e);
				};
			} else {
				request.load = request.success;
				delete request.success;
			}
			if (typeof request.error == 'undefined') {
				request.error = function(e) {
					console.info("Ajax request error. " + e);
				};
			}
			dojo.xhrPost(request);
		},
		
		prepareBTTParams : function(params){
			var obj = {};
			if (params != undefined) {
				if (params[this.constants.BTT_ERRORPAGE]) {
					obj[this.constants.BTT_ERRORPAGE] = params[this.constants.BTT_ERRORPAGE];
				}
				if (params[this.constants.BTT_OPERATIONNAME]) {
					obj[this.constants.BTT_OPERATIONNAME] = params[this.constants.BTT_OPERATIONNAME];
				}
				if (params[this.constants.BTT_PAGEID]) {
					obj[this.constants.BTT_PAGEID] = params[this.constants.BTT_PAGEID];
				} else {
					obj[this.constants.BTT_PAGEID] = '-1';
				}
				if (params[this.constants.BTT_PROCESSORID]) {
					obj[this.constants.BTT_PROCESSORID] = params[this.constants.BTT_PROCESSORID];
				}
				if (params[this.constants.BTT_SESSIONID]) {
					obj[this.constants.BTT_SESSIONID] = params[this.constants.BTT_SESSIONID];
				}
			}
			return obj;
		}
		
	};
	
})();

}

if(!dojo._hasResource["com.ibm.btt.dijit.AbstractAjaxMixin"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.AbstractAjaxMixin"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2011 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit.AbstractAjaxMixin"); 


dojo.declare("com.ibm.btt.dijit.AbstractAjaxMixin", null,{
	
	/**
	 * nls bundle
	 * 
	 * @tag private this is a internal property, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_bundle : new com.ibm.btt.util.I18nBundle("com.ibm.btt.dijit", "Form"),
	
	/**
	 * BTT channel property, contains the parameters required by the BTT HTML channel.
	 */
	bttParams : "",
	
	/**
	 * The async code is used to identity the Ajax calling. It is a random string input by the developers on the tooling.
	 * 
	 */
	asyncCode : '',
	
	/**
	 * HTML status of the Ajax calling.
	 * 
	 */
	asyncStatus : 0,
	
	/**
	 * XHR error message from the browser.
	 * 
	 */
	asyncErrorMessage :"",
	
	/**
	 * Operation name defined on the server
	 * 
	 */
	asyncOperation : "",
	
	/**
	 * Constants used in the BTT channel.
	 * 
	 */
	
	
	/**
	 * Ajax calling function. 
	 * 
	 * @tag	public
	 * 
	 * @param bttOperationId String variable: BTT operation ID
	 * @param asyncCode String variable: random code for XHR
	 * @param timeout Integer variable: milliseconds for timeout
	 * @param respsContainer the response container id which the response data will be set to
	 */
	callAsyncOperation : function(bttOperationId, asyncCode, timeout, respsContainer) {
 
		var formValues = this.get("value");
		var bttParam = dojo.fromJson(this.bttParams);
		bttParam[AjaxUtil.constants.BTT_OPERATIONNAME] = bttOperationId;
		bttParam = AjaxUtil.prepareBTTParams(bttParam);
		
		AjaxUtil.xhrPost({
			success : dojo.hitch(this, "_handleOperationResponse", asyncCode, respsContainer),
			error : dojo.hitch(this, "_handleOperationError", asyncCode),
			'timeout' : timeout
		}, dojo.mixin(formValues, bttParam));
		
	},
	
	/**
	 * Handler for successful response of XHR.
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 *              
	 * @param asyncCode random code for XHR to identify different request
	 * @param respsContainer the response container id which the response data will be set to
	 * @param responseData response data returned from server
	 */
	_handleOperationResponse : function(asyncCode, respsContainer, responseData) {
		
		try {
			var resData = dojo.fromJson(responseData || null);
			responseData = resData;
		} catch(e) {
			this._handleHTMLResponse(responseData);
			return ;
		}
		this.asyncCode = asyncCode;
		var values = null;
		var singleFieldErrors = null;
		var crossFieldErrors = null;
		if(dojo.isArray(responseData)) {
			values = responseData[0].data;
			if(responseData[0].validationError) {
				singleFieldErrors = responseData[0].singleFieldErrors;
				crossFieldErrors = responseData[0].crossFieldErrors;
			}
		} else {
			values = responseData;
		}
		if(values) {
			if(respsContainer && dijit.byId(respsContainer)){
				dijit.byId(respsContainer).set('value', values);
			}else{
				this.set('value', values);
			}
		}
		if((singleFieldErrors && singleFieldErrors.length != 0)|| (crossFieldErrors && crossFieldErrors.length != 0)) {
			var wgtMap = this._getWidgetMap();
			this._handleSingleFieldErrors(singleFieldErrors, wgtMap);
			this._handleCrossFieldErrors(crossFieldErrors, wgtMap);
		}
		this.onAsyncOK();
		
	},	
	
	/**
	 * handle plain html response of XHR
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_handleHTMLResponse : function(htmlText) {
		(new dijit.Dialog({
            title: this._bundle.getMessage("errorDialogTitle"),
            content : htmlText
        })).show();
	},
	
	/**
	 * get all descendant widgets under this container
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_getWidgetMap : function() {
		var map = { };
		dojo.forEach(this.getDescendants(), function(widget){
			if(!widget.name){ return; }
			var entry = map[widget.name] || (map[widget.name] = [] );
			entry.push(widget);
		});
		return map;
	},
	
	/**
	 * Handle the single field error messages from the server side.
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_handleSingleFieldErrors : function(singleFieldErrors, widgetMap) {
		if(singleFieldErrors != null) {
			for(var i = 0; i < singleFieldErrors.length; i++) {
				if(widgetMap[singleFieldErrors[i].id]) {
					var entry = widgetMap[singleFieldErrors[i].id];
					if(entry){
						for(var j = 0; j < entry.length; j++) {
							if(entry[j].showErrorMessage) { 
								entry[j].showErrorMessage(singleFieldErrors[i].msg);
							}
						}
					}
				}
			}
		}
	},
	
	/**
	 * Handle the cross field error messages from the server side.
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_handleCrossFieldErrors : function(crossFieldErrors, widgetMap) {
		if(crossFieldErrors != null) {
			var entry = widgetMap["dse_errorMessages"];
			if(entry) {
				for(var j = 0; j < entry.length; j++) {
					entry[j].displayMessageArray(crossFieldErrors);
				}
			}	
		}
	},
	
	/**
	 * Set the data to the corresponding store on the web page.
	 * 
	 */
	setStoreData : function(obj) {

		var map = { };
		dojo.forEach(this.getDescendants(), function(widget){
			if(!widget.name){ return; }
			var entry = map[widget.name] || (map[widget.name] = [] );
			entry.push(widget);
		});

		for(var name in map){
			if(!map.hasOwnProperty(name)){
				continue;
			}
			var widgets = map[name],						// array of widgets w/this name
				storeDatas = dojo.getObject(name, false, obj);	// list of values for those widgets

			if(storeDatas === undefined){
				continue;
			}
			if(!dojo.isArray(storeDatas)){
				storeDatas = [ storeDatas ];
			}

			dojo.forEach(widgets, function(w, i){
				if(w.setStoreData) {
					w.setStoreData(storeDatas[i]);
				}
			});
		}
		
	},
	
	/**
	 * Handler for error in the process of XHR
	 *  
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_handleOperationError : function(asyncCode, error) {
		
		if(error.dojoType === "timeout") {
			this.asyncCode  = asyncCode;
			this.asyncStatus  = 0;
			this.asyncErrorMessage  = error.message;
			this.onAsyncTimeOut();
			
		} else if(error.status !== undefined) {
			this.asyncCode  = asyncCode;
			this.asyncStatus  = error.status;
			this.asyncErrorMessage  = error.message;
			this.onAsyncError();
			
		}
	},
   
	
	/**
	 * Function used to publish Ajax timeout event.
	 */	
	onAsyncTimeOut : function() {
		
	},
	
	/**
	 * Function used to publish Ajax successful event.
	 */
	onAsyncOK : function() {
		
	},

	/**
	 * Function used to pubish Ajax error event.
	 * 
	 */
	onAsyncError : function() {
		
	},
	
	
	/**
	 * Get values from the widgets on the page.
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_getValueAttr: function(){

		var obj = { };
		var scope = this;
		dojo.forEach(this.getDescendants(), function(widget){
			var name = widget.name;
			
			//Modify to filter the value of label and anchor
			if((!name || widget.disabled || widget.isNotSubmitted) && (!widget.storeDataName || !widget.getEditableStroeData || ( ( widget instanceof com.ibm.btt.dijit.Grid) &&  widget.readOnly))){ return; }
			
			if(typeof(widget.ajaxSubmit)!="undefined" && widget.ajaxSubmit==false){ return; }
			
			if(widget.storeDataName && widget.getEditableStroeData && ( (widget instanceof com.ibm.btt.dijit.Grid) && widget.editable && !widget.readOnly) && widget.getEditableStroeData()) {
				dojo.setObject(widget.storeDataName, scope._convertValueToString(widget.getEditableStroeData()), obj);
			}
			// Single value widget (checkbox, radio, or plain <input> type widget
			var value = widget.get('value');

			//if(value == undefined || value == null){ return ; }
			if(value === undefined){ return ; }

			if ((widget instanceof com.ibm.btt.dijit.Grid) && (value == null || value == undefined)) {
				return;
			}
			
			if(value == null){
				value = "";
			}
			
			// Store widget's value(s) as a scalar, except for checkboxes which are automatically arrays
			if(typeof widget.checked !== 'undefined'){
				if(/Radio/.test(widget.declaredClass)){
					// radio button
					if(value !== false){
						dojo.setObject(name, scope._convertValueToString(value), obj);
					}else{
						// give radio widgets a default of null
						value = dojo.getObject(name, false, obj);
						if(value === undefined){
							dojo.setObject(name, null, obj);
						}
					}
					
				}else{
					// checkbox/toggle button
					if(value !== false){
						dojo.setObject(name, scope._convertValueToString(value), obj);
					}					
				}
			}else{
				
				if (typeof value == "number" && widget.serialize) {
					value = widget.serialize(value, widget.constraints);
				} else if(value != null &&  value instanceof Date) {
					if(widget.serialize) {
						value = widget.serialize(value, widget.constraints);
					} else {
						value = value.getFullYear() + "-" + (value.getMonth() + 1)+ "-" + value.getDate();
					}
				}
				
				value = scope._convertValueToString(value);
				var prev = dojo.getObject(name, false, obj);
				if(typeof prev != "undefined"){
					if(dojo.isArray(prev)){
						prev.push(value);
					}else{
						dojo.setObject(name, [prev, value], obj);
					}
				}else{
					// unique name
					dojo.setObject(name, value, obj);
				}
			}
		});

		return obj;
	},	
	
	/**
	 * convert a object type value to string value
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_convertValueToString : function(vobj) {
		
		if(vobj === null) {
			return null;
		} 
		if(typeof vobj === "string") {
			return vobj;
		} else if(typeof vobj === "number" || typeof vobj === "boolean") {
			return String(vobj);
		} else if(typeof vobj === "object") {
			if(dojo.isArray(vobj)) {
				for(var i = 0; i < vobj.length; i++) {
					vobj[i] = arguments.callee(vobj[i]);
				}
			} else {
				for(var p in vobj) {
					vobj[p] = arguments.callee(vobj[p]);
				}
			}
			return vobj;
		} else {
			return null;
		}
		
	},
	
	/**
	 * Set values to the widgets on the page.
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setValueAttr: function(/*object*/obj){
		// summary:
		//		Fill in form values from according to an Object (in the format returned by attr('value'))

		// generate map from name --> [list of widgets with that name]
		var map = { };
		var storeMap = {};
		dojo.forEach(this.getDescendants(), function(widget){
			if(widget.storeDataName) {
				var storeEntry = storeMap[widget.storeDataName] || (storeMap[widget.storeDataName] = [] );
				storeEntry.push(widget);
			}
			if(!widget.name){ return; }
			var entry = map[widget.name] || (map[widget.name] = [] );
			entry.push(widget);
		});

		for(var name in storeMap) {
			var widgets = storeMap[name];
			var storeData = dojo.getObject(name, false, obj);
			if(storeData !== undefined) {
				dojo.forEach(widgets, function(w, i){
					w.setStoreData(i == 0 ? storeData : dojo.clone(storeData));
				});
			}
		}
		
		for(var name in map){
			if(!map.hasOwnProperty(name)){
				continue;
			}
			
			var widgets = map[name],						// array of widgets w/this name
				values = dojo.getObject(name, false, obj);	// list of values for those widgets
			
			if(values === undefined){
				continue;
			}
			
			if(!dojo.isArray(values)){
				values = [ values ];
			}			
			
			if(typeof widgets[0].checked !== 'undefined'){
				// for checkbox/radio, values is a list of which widgets should be checked
				dojo.forEach(widgets, function(w, i){
					w.set('value', dojo.indexOf(values, w.value) != -1);
				});
			}else if(widgets[0].multiple){
				// it takes an array (e.g. multi-select)
				widgets[0].set('value', values);
			}else{
				// otherwise, values is a list of values to be assigned sequentially to each widget
				dojo.forEach(widgets, function(w, i){
					w.set('value', values[i]);
				});
			}
		}

	},
	
	
	validValue : null,
	
	/**
	 * Get values from the widgets on the page.
	 *
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * 
	 * @return This method only return the widget value which is valid and not change compared with the initial value.
	 * 
	 * */
	_getValidValueAttr: function(){

		var obj = { };
		var scope = this;
		dojo.forEach(this.getDescendants(), function(widget){
			var name = widget.name;
			
			//Modify to filter the value of label and anchor
			if((!name || widget.disabled || widget.isNotSubmitted) && (!widget.storeDataName || !widget.getEditableStroeData || ( ( widget instanceof com.ibm.btt.dijit.Grid) &&  widget.readOnly && !widget.disabled))){ return; }
			
			if(widget.state && !(widget.get("state") == "" || widget.get("state") == "Normal")){return;}
			
			if(typeof(widget.ajaxSubmit)!="undefined" && widget.ajaxSubmit==false){ return; }
			
			if(widget.storeDataName && widget.getEditableStroeData && ( (widget instanceof com.ibm.btt.dijit.Grid) && !widget.readOnly)) {
				var tmpData = widget.getEditableStroeData();
				if(tmpData){
					dojo.setObject(widget.storeDataName, scope._convertValueToString(tmpData), obj);
				}
			}
			// Single value widget (checkbox, radio, or plain <input> type widget
			var value = widget.get('value');

			//if(value == undefined || value == null){ return ; }
			if(value === undefined){ return ; }
			
			if(value == null){
				value = "";
			}
			
			// Store widget's value(s) as a scalar, except for checkboxes which are automatically arrays
			if(typeof widget.checked !== 'undefined'){
				if(/Radio/.test(widget.declaredClass)){
					// radio button
					if(value !== false){
						dojo.setObject(name, scope._convertValueToString(value), obj);
					}else{
						// give radio widgets a default of null
						value = dojo.getObject(name, false, obj);
						if(value === undefined){
							dojo.setObject(name, null, obj);
						}
					}
					
				}else{
					// checkbox/toggle button
					if(value !== false){
						dojo.setObject(name, scope._convertValueToString(value), obj);
					}					
				}
			}else{
				
				if (typeof value == "number" && widget.serialize) {
					value = widget.serialize(value, widget.constraints);
				} else if (value != null &&  value instanceof Date) {
					if(widget.serialize) {
						value = widget.serialize(value, widget.constraints);
					} else {
						value = value.getFullYear() + "-" + (value.getMonth() + 1)+ "-" + value.getDate();
					}
				}
				
				value = scope._convertValueToString(value);
				
				if (widget.type !== "hidden" && (
						(widget.params.value && widget.params.value == value) || 
								(!widget.params.value && "" == value))) {
					return;
				}
				
				var prev = dojo.getObject(name, false, obj);
				if(typeof prev != "undefined"){
					if(dojo.isArray(prev)){
						prev.push(value);
					}else{
						dojo.setObject(name, [prev, value], obj);
					}
				}else{
					// unique name
					dojo.setObject(name, value, obj);
				}
			}
		});

		return obj;
	}
	
}); 
	

}

if(!dojo._hasResource["com.ibm.btt.dijit._FormXValidationMixin"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit._FormXValidationMixin"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2011 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit._FormXValidationMixin"); 

dojo.declare("com.ibm.btt.dijit._FormXValidationMixin", null,{
	// summary:
	//		Mixin for BTT form widget
	// description:
	//		Validate form according to cross fields validation rules	
	
	//xValidations: Collection?
	//				List of xValidation rules
	xValidations : [],
	
	//xValidations: boolean?
	//				Indidates if form is valid according to xValidation rules
	xValid : true,
	
	//_xHintWidget: dijit._widget?
	//				The widget where xvalidation message to be shown around
	
	_xHintWidget : null,
	
	//return value of property by given id
	getPW : function(id, property) {
		var value=dijit.byId(id).get(property);
		return value;
	},
	
	//return widget by given id
	getW : function(id) {
		return dijit.byId(id);
	},
	
	//invoke function of widget by given id
	runWF: function( id, functionName, parameter){		
		
		var targetObj = dijit.byId(id);
		var args = [];
		for ( var i = 2; i < arguments.length; i++) {
			args[i - 2] = arguments[i];
		}

		var result = targetObj[functionName].apply(targetObj, args);
		return result;
	},
	
	//Do xValidation and return the hint message for the hint message for the first invalid rule
	xValidate: function( xRules){
		if(!xRules || xRules.length == 0){
			return "";
		}
		var inValidRule = null;
		for(var i=0; i<xRules.length; i++){
			if(!xRules[i].cond.call(this)){
				inValidRule = xRules[i];
				break;
			}
		}
		return inValidRule;
	},
	
	/**
	 *summary: conditions of an active xValidation for widget
	 *			1. xValidation contains the widget
	 *			2. all values of widgets in xValidation are not null
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_getActiveXValidationsForWidget: function(/*String*/ widgetId){	
		return this._getActiveXValidations(this._getXValidationRuleByWidget(widgetId),widgetId);	
	},
	
	
	
	/**
	 * 
	 * @return xvalidation rules in which all values of widget are not null
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_getActiveXValidations: function(rules,widgetId){
		return dojo.filter(rules,function(xValidation){
			return dojo.every(xValidation.widgets,function(id){				
				return ((id == widgetId) || (id != widgetId && dijit.byId(id).get("value") != ""));
			});
		});			
	},
	
	/**
	 * 
	 * @return return xValidations which contain the widget
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_getXValidationRuleByWidget: function(/*String*/ widgetId){
		var rules = dojo.filter(this.xValidations,function(xValidation){
			return dojo.indexOf(xValidation.widgets,widgetId)>=0;

		});		
		return rules;
	},
	
	//show hint message around widget
	showXValidationMsg : function(/*String*/ hintMsg, widget){
		if(widget){
			this._hideXHint();
			this._xHintWidget = widget;
			dijit.showTooltip(this.getI18NString(hintMsg), widget.domNode);
		}
	},
	
	/**
	 * 
	 * hide current hint message
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_hideXHint : function(){
		if(this._xHintWidget){
			_xHintWidget = null;
			dijit.hideTooltip(this._xHintWidget.domNode);
		}
	},
	
	destroy : function(){
		this.inherited(arguments);
		/*
		 * When destroy the form, the tooltips may still be there event the page is
		 * disposed in ajax mode, need check and close all tooltips when form is disposed
		 * */
		this._hideXHint();
	}
});

}

if(!dojo._hasResource["com.ibm.btt.dijit.Form"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.Form"] = true;
  /*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit.Form");








/**
 * Declare a widget to wrap the HTML form and provide the Ajax Calling function.
 * 
 * Basic Function:
 * 		1. The form widget is used to submit the values of input widgets on the BTT Web2.0 web page.
 *      2. The form widget can invoke the validations of the input widgets on the browser side automatically before submitting.
 *      3. The form widget provides the Ajax calling function to submit all the values of input widgets on the page through XHR.
 *      
 * Implemented based on dijit.form.Form.
 */
dojo.declare("com.ibm.btt.dijit.Form", [ dijit.form.Form,
                                         com.ibm.btt.dijit.AbstractWidgetMixin,
                                         com.ibm.btt.dijit.AbstractAjaxMixin,
                                         com.ibm.btt.dijit._FormXValidationMixin], {
	
	bttErrorPage : "",
	
	/**
	 * This property indicates whether the form will invoke the validation of the input widgets in it.
	 * 
	 */
	validateOnSubmit : true,
	
	hiddenParamHandle : {},
	
	_isStarted : false,
	
	attributeMap: dojo.delegate(dijit.form.Form.prototype.attributeMap, {
		
		visibility : {
			node : "domNode"
		}
	
	}),
	
	create : function() {
		this.submitButton = new Array();
		this.submitButtonOS = new Array();
		this.inherited(arguments);
		
		this._events = [];
		this._events.push(dojo.connect(this.domNode, "onkeypress", this, "_onKey"));
	},
	
	onLoaded : function(){
		/* a Form event to bind ECA rules when page reloading */
	},
	
	onFormSubmit: function(){
		
	},


	/**
	 * 
	 * hook method for xValidation attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setXValidationsAttr: function(value){
		this.xValidations = value;
		//update xValid
		if(this.xValidate(this.xValidations)){
			this.xValid = false;
			this.setSubmitButtonState();
		}			
	},
	
	/**
	 * 
	 * hook method for Visibility attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_xValidateByWidget : function(widget){
		//1. show xValidation hint if there is inValid rule
		//2. update xValid & submitButton
		var widgetInvalidRule = this.xValidate(this._getActiveXValidationsForWidget(widget.get("id")));
		var hintWidget = widget;
		if(!widgetInvalidRule){
			widgetInvalidRule = this.xValidate(this._getActiveXValidations(this.xValidations));
			hintWidget = widgetInvalidRule ? dijit.byId(widgetInvalidRule.widgets[0]) : widget;
		}
		if(widgetInvalidRule){
			this.showXValidationMsg(widgetInvalidRule.hint,hintWidget);
		}
		
		//update submit button
		var invalidRule;
		if(invalidRule = this.xValidate(this.xValidations)){
			if(!widgetInvalidRule){//in case hint message was not shown
				this.showXValidationMsg(invalidRule.hint,dijit.byId(invalidRule.widgets[0]));
			}
			this.xValid = false;
		}
		else{
			this.xValid = true;
			this._hideXHint();
		}
		this.setSubmitButtonState();		
	},
	
	fireWidgetBlurEvent : function(widget){
		this._xValidateByWidget(widget);
	},
	
	fireWidgetChangeEvent : function(widget){
		this._xValidateByWidget(widget);
		this.onWidgetChange();
	},
	
	//publish onWidgetChange event
	onWidgetChange : function(){
	},
	
	
	//override
	connectChildren: function(/*Boolean*/ inStartup){
		this.inherited(arguments);		
		var conns = this._childConnections; 
		var _this = this;
		var formDescendants = this.getDescendants();
		dojo.forEach(dojo.filter(formDescendants, function(item){ return item.onChange; } ),
				function(widget){
					conns.push(_this.connect(widget, "onChange", dojo.hitch(_this, "fireWidgetChangeEvent", widget)));
					conns.push(_this.connect(widget, "onBlur", dojo.hitch(_this, "fireWidgetBlurEvent", widget)));
				}
		);
	},
	
	/**
	 * 
	 * try to validate form and set the button status and error message
	 * when the status of any widget under this form changed
	 * 
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_onWidgetValidateStatesChange : function(widget) {
		if(this.isValid() && !this.xValid){
			if((inValidRule = this.xValidate(this.xValidations))){
				this.xValid = false;
				this.showXValidationMsg(inValidRule.hint,dijit.byId(inValidRule.widgets[0]));
			}
			else{
				this.xValid = true;	
				this._hideXHint();
			}
		}
		this.setSubmitButtonState();
	},
	
	onSubmit : function(e){
			
		var button = this._querySubmitButton(e);
		
		this.handleButtonSubmit(button);
		
		if(this.validateOnSubmit) {
			if(!this.isValid() || !this.xValid) return false;
		}
		
		dojo.forEach(this.getDescendants(), function(widget){
			if(widget.onFormSubmit) {
				widget.onFormSubmit();
			}
		});		
		
		if(this.onFormSubmit){
			this.onFormSubmit();
		}
		
		return true;
		
	},
	
	/**
	 * 
	 * get the submit button which is clicked to trigger form submit evnet
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_querySubmitButton : function(e){
		if(this._lastClickedButton){
			return this._lastClickedButton;
		}
	},
	
	/**
	 * 
	 * This method is used to set the disabled states for submit buttons
	 * depending on the validation result in the form. If there were any 
	 * validation error, all submit buttons will be disabled. After all fields
	 * in this form passed all validation rules, submit buttons may be enabled
	 * if it is not disabled by customer.
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	setSubmitButtonState : function() {
		if(this.validateOnSubmit){
			//Normal, Incomplete, or Error
			if ((this.get("state") == "" || this.get("state") == "Normal") && this.xValid) {
				for ( var i = 0; i < this.submitButton.length; i++) {
					var btn = this.submitButton[i];
					btn.set('disabled', btn.get("inValid"));
				}
			} else {
				for ( var i = 0; i < this.submitButton.length; i++) {
					this.submitButton[i].set('disabled', true);
				}
			}
		}
	},
	
	/**
	 * 
	 * Handler method for click the submit button, add 
	 * all btt required parameters into the form
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	handleButtonSubmit : function(button) {
		if (button && button.bttParams && button.bttParams != "") {
			this.parameterHandler(button.bttParams);
		}
	},
	
	
	startup : function() {
		if(this._isStarted)
			return;
		this._isStarted = true;
		this.inherited(arguments);
		var _this = this;
		watches = this._childWatches;
		var conns = this._childConnections; 
		dojo.forEach(dojo.filter(this.getDescendants(), function(item) {
			return  item.get('type') && item.get('type').toLowerCase() == "submit" ;
		}), function(widget) {
			_this.submitButton.push(widget);
			_this.submitButtonOS.push(widget.attr("disabled"));
			watches.push(widget.watch("isValid", function(widget, oldVal, newVal){
				_this.setSubmitButtonState();
			}));
		});
		if (this.bttParams != null && this.bttParams != "") {
			this.parameterHandler(this.bttParams);
		}
		
		if(this.bttErrorPage != null && this.bttErrorPage != "") {
			this.errorPageHandler();
		}
		
		this.watch("state", this._onWidgetValidateStatesChange);
		/* as maybe some widgets are filled with default values. 
		 * Fire this event, so Beta can do something using ECA*/
		this.onWidgetChange(); 
		
		this.setSubmitButtonState();
	},
	
	/**
	 * 
	 * this method is used to add all btt required parameters under this form
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	parameterHandler : function(e) {
		var params = dojo.fromJson(e);
		this.destroyHiddenParams();
		for ( var paramName in params) {
			if (typeof (paramName) != "undefined") {
				var paramValue = params[paramName];
				this.hiddenParamHandle[paramName] = dojo.create("input", {
					type : 'hidden',
					name : paramName,
					value : paramValue
				});
				dojo.place(this.hiddenParamHandle[paramName],
						this.containerNode, "last");
			}
		}
	},
	
	/**
	 * 
	 * destroy all hidden btt required parameters underthis form
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	destroyHiddenParams : function(){
		for(var paramName in this.hiddenParamHandle){
			dojo.destroy(this.hiddenParamHandle[paramName]);
		}
		this.hiddenParamHandle = {};
	},
	
	/**
	 * 
	 * Add error page parameter under form as a hidden file, it will be submitted to server
	 * together with all other parameters and data
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	errorPageHandler : function() {
		var node = dojo.create("input", {
			type : 'hidden',
			name : AjaxUtil.constants["BTT_ERRORPAGE"],
			value : this.bttErrorPage
		});
		dojo.place(node, this.containerNode, "last");
	},
	
	/**
	 * 
	 * monitor the key press event to submit the form when user click enter on the form
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_onKey: function(/*Event*/ evt){
		//listen the onkey event on the domNode to monitor
		//the Enter key event on the html
		//If user press Enter on the widget which inside the form
		//We will look from the upper html node to see whether this 
		//widget is inside a form, if true we will submit the form, 
		//otherwise do nothing.
		if(evt.charOrCode){
			var dk = dojo.keys;
			var node = evt.target;
			if(evt.charOrCode === dk.ENTER){
				while(node){
					if (node == this.domNode) {
						if(this.bttParams && this.bttParams != ""){
							this.submit();
						} else {
							return false;
						}
					} 
					node = node.parentNode;
				}
			}	
		}
	},
	
	destroy : function() {
		//clean all hidden btt parameters before destroy the form
		this.destroyHiddenParams();
		this.inherited(arguments);
		//release all connections
		while (this._events.length > 0) {
			dojo.disconnect(this._events.pop());
		}
	}
	
});

}

if(!dojo._hasResource["com.ibm.btt.dijit.Image"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.Image"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit.Image");





dojo.declare("com.ibm.btt.dijit.Image", [ dijit._Widget, dijit._Templated,com.ibm.btt.dijit.AbstractWidgetMixin], {

	templateString : "<img >",

	location : "",

	width : "",

	height : "",

	attributeMap : dojo.delegate(dijit._Widget.prototype.attributeMap,{
		
		location : {
			node : "domNode",
			type : "attribute",
			attribute : "src"
		},
		
		width : {
			node : "domNode",
			type : "attribute"
		},
		
		height : {
			node : "domNode",
			type : "attribute"
		},
		
		visibility : {
			node : "domNode"
		}
		
	}),
	
	/**
	 * 
	 * hook method for location attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setLocationAttr : function(value){
		this.location = value;
		this.domNode.src = value;
	},
	
	/**
	 * 
	 * hook method for width attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setWidthAttr : function(value) {
		if (value != "") {
			this.width = value;
			dojo.style(this.domNode, "width", this.handleLenUint(this.width));
		}
	},

	/**
	 * 
	 * hook method for height attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setHeightAttr : function(value) {
		if (value != "") {
			this.height = value;
			dojo.style(this.domNode, "height", this.handleLenUint(this.height));
		}
	}
});

}

if(!dojo._hasResource["com.ibm.btt.dijit.Label"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.Label"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit.Label"); 


 
 

dojo.declare("com.ibm.btt.dijit.Label",[dijit._Widget,dijit._Templated,com.ibm.btt.dijit.AbstractWidgetMixin] ,{ 

	templateString : "<label class='dijitLabelBase' dojoAttachPoint='labelContainer' ${nameAttrSetting} ></label>",
	
	text : "",
	
	name: "",
	
	"for" : "",
	
	width : "",
	
	height : "",
	
	textWrap : false,
	
	isNotSubmitted : true,
	
	fieldReference : "",
	
	postMixInProperties: function(){

		this.nameAttrSetting = this.name ? ("name='" + this.name + "'") : "";
		this.inherited(arguments);
	},
	
	attributeMap : dojo.delegate(dijit._Widget.prototype.attributeMap, {
		text : {
			node : "domNode",
			type : "innerHTML"
		},
		visibility : {
			node : "domNode"
		},
		"for" : {
			node : "domNode"
		}
	}),
	
	postCreate : function() {
		this.inherited(arguments);
		if (this.hint == undefined || this.hint == null || this.hint == "") {
			this.set('hint', this.text);
		}
	},
	
	/**
	 * 
	 * hook method for text attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setTextAttr : function(value){
		this.text = value;
		this.domNode.innerHTML = this.getI18NString(value);
	},
	
	/**
	 * 
	 * hook method for textWrap attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setTextWrapAttr : function(value) {
		this.textWrap = value;
		if (this.textWrap) {
			dojo.addClass(this.domNode, "dijitLabelWrap");
		} else {
			dojo.removeClass(this.domNode, "dijitLabelWrap");
		}
	},
	
	/**
	 * 
	 * hook method for value attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setValueAttr : function(value){
		this.set("text", value);
	},
	
	/**
	 * 
	 * hook method for value attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_getValueArrt : function(name){
		return this.get("text");
	},
	
	/**
	 * 
	 * hook method for for attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setForAttr : function(value){
		this.domNode.htmlFor = value;
	},
	
	/**
	 * 
	 * hook method for width attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setWidthAttr : function(value){
		if(this.width != ""){
			this.width = value;
			dojo.style(this.domNode, "width", this.handleLenUint(this.width));
		}
	},
	
	/**
	 * 
	 * hook method for height attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setHeightAttr : function(value){
		if(this.height != ""){
			this.height = value;
			dojo.style(this.domNode, "height", this.handleLenUint(this.height));
		}
	}
}); 

}

if(!dojo._hasResource["com.ibm.btt.dijit.RadioButton"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.RadioButton"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
 */

dojo.provide("com.ibm.btt.dijit.RadioButton");




dojo.declare("com.ibm.btt.dijit.RadioButton", [ dijit.form.RadioButton, com.ibm.btt.dijit.AbstractWidgetMixin], {

	isChecked : false,

	text : "",

	visibility : "visible",
	
	width : "",
	
	height : "",
	
	textWrap : false,

	attributeMap : dojo.delegate(dijit.form.RadioButton.prototype.attributeMap,{

		text : {
			node : "labelNode"
		},
		
		isChecked : {
			node : "domNode"
		},

		visibility : {
			node : "domNode"
		}

	}),

	postMixInProperties: function(){
		if(this.isChecked==true){
			this.checked = "checked";
			this.params.checked = "checked";
		}
		this.inherited(arguments);
	},
	
	create : function() {
		this.labelNode = dojo.create("label", {'class':'dijitLabelBase'}, this.domNode, "after");
		this.inherited(arguments);
		this.labelNode.htmlFor = this.id;
		dojo.place(this.labelNode, this.domNode, "after");
		

		if (this.width && this.width != "") {
			this.set("width", this.width);
		}
		
		if (this.height && this.height != "") {
			this.set("height", this.height);
		}
		
	},

	/**
	 * 
	 * hook method for isChecked attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setIsCheckedAttr : function(value){
		this.set("checked", value);
	},
	
	/**
	 * 
	 * hook method for checked attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setCheckedAttr : function(value){
		if (value == false || value == "false" || value == "") {
			this.isChecked = false;
		}else {
			this.isChecked = true;
		}
		this.inherited(arguments);
	},
	
	/**
	 * 
	 * hook method for text attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setTextAttr : function(value){
		this.text = value;
		this.labelNode.innerHTML = this.getI18NString(value);
	},
	
	/**
	 * 
	 * hook method for style attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setStyleAttr : function(value){
		dojo.attr(this.labelNode, "style", value);
	},
	
	/**
	 * 
	 * hook method for class attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setClassAttr : function(value){
		dojo.attr(this.labelNode, "class", value);
	},

	/**
	 * 
	 * hook method for hint attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setHintAttr : function(value){
		this.hint = value;
		var tmpVal = StringUtil.removeWarp(this.getI18NString(value));
		this.domNode.title = tmpVal;
		this.labelNode.title = tmpVal;
	},
	
	/**
	 * 
	 * hook method for Visibility attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setVisibilityAttr : function(value){
		this.visibility = value;
		if (value === "gone") {
			dojo.style(this.domNode, "visibility", "visible");
			dojo.style(this.domNode, "display", "none");
			
			dojo.style(this.labelNode, "visibility", "visible");
			dojo.style(this.labelNode, "display", "none");
		} else if (value === "hidden") {
			dojo.style(this.domNode, "display", "");
			dojo.style(this.domNode, "visibility", "hidden");
			
			dojo.style(this.labelNode, "display", "");
			dojo.style(this.labelNode, "visibility", "hidden");
		} else {
			dojo.style(this.domNode, "display", "");
			dojo.style(this.domNode, "visibility", "visible");
			
			dojo.style(this.labelNode, "display", "");
			dojo.style(this.labelNode, "visibility", "visible");
		}
	},
	
	/**
	 * 
	 * hook method for readOnly attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setReadOnlyAttr: function(/*Boolean*/ value){
		this.inherited(arguments);
		if (value === "true" || value === true) {
			this.labelNode.htmlFor = "";
		}
		else{
			this.labelNode.htmlFor = this.id;
		}
	},
	
	/**
	 * 
	 * override default onclick method to fix read only bug for IE6/7/8
	 * this mathod will be removed after dojo fixed this defect
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_onClick : function(e) {
		this.inherited(arguments);
		if (dojo.isIE && this.readOnly && this.focusNode.form) {
			dojo.stopEvent(e);
			dojo.query("INPUT[type=radio]", this.focusNode.form).forEach(
				dojo.hitch(this, function(inputNode) {
					if (inputNode.name == this.name && inputNode.form == this.focusNode.form) {
						var widget = dijit.getEnclosingWidget(inputNode);
						if (widget && "checked" in widget) {
							widget.set('checked', widget.checked);
						}
					}
			}));
		}
	},
	
	/**
	 * 
	 * hook method for textWrap attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setTextWrapAttr : function(value) {
		this.textWrap = value;
		if (this.textWrap) {
			dojo.addClass(this.labelNode, "dijitLabelWrap");
		} else {
			dojo.removeClass(this.labelNode, "dijitLabelWrap");
		}
	},
	
	/**
	 * 
	 * hook method for width attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setWidthAttr : function(value){
		if(this.width != ""){
			this.width = value;
			
			var width = value.replace(new RegExp("px", "gm"), "");
			try{
				width = Number(width);
			} catch(e) {
				console.error("Illegal input argument. Can not convert input width:"+ value +" to number.");
				return;
			}
			var box = dojo.marginBox(this.domNode);
			var labelWidth = width - box.w;
			if(labelWidth<0){
				labelWidth = 0;
			}
			dojo.style(this.labelNode, "width", labelWidth + "px");
		}
	},
	
	/**
	 * 
	 * hook method for height attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setHeightAttr : function(value){
		if(this.height != ""){
			this.height = value;
			var height = value.replace(new RegExp("px", "gm"), "");
			try{
				height = Number(height);
			} catch(e) {
				console.error("Illegal input argument. Can not convert input height:"+ value +" to number.");
				return;
			}
			var box = dojo.marginBox(this.domNode);
			var labelHeight = height - box.h;
			if(labelHeight<0){
				labelHeight = 0;
			}
			dojo.style(this.labelNode, "height", labelHeight + "px");
		}
	},
	
	/**
	 * 
	 * hook method for focus event
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	// fix for JR41901, remove focused style for empty label
	_onFocus: function(){
		this.inherited(arguments);
		if(!this.text || this.text === "" || this.text === null ){
			dojo.query("label[for='"+this.id+"']").removeClass("dijitFocusedLabel");
		}
	},
	
	destroy : function(){
		this.inherited(arguments);
		dojo.destroy(this.labelNode);
		this.labelNode = null;
	}
});

}

if(!dojo._hasResource["com.ibm.btt.dijit.RichTextEditor"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.RichTextEditor"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit.RichTextEditor");




dojo.declare("com.ibm.btt.dijit.RichTextEditor", [ dijit.Editor,
        com.ibm.btt.dijit.AbstractWidgetMixin ], {
	
	width:"",
	
	readOnly : false,
	
	attributeMap: dojo.delegate(dijit.Editor.prototype.attributeMap, {
		
		visibility : {
			node : "domNode"
		},
		
		width : {
			node : "domNode"
		},
		
		readOnly : {
			node : "domNode"
		}
		
	}),

	/**
	 * 
	 * hook method for readOnly attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setReadOnlyAttr : function(value) {
		this.set("disabled", value);
	},

	/**
	 * 
	 * hook method for readOnly attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_getReadOnlyAttr : function() {
		return this.get("disabled");
	},
	
	postCreate: function(){
		
		var tmpName = this.name;
		
    	this.inherited(arguments);
		this._setWidthAttr(this.width);
		this._setHintAttr(this.hint);
		this._setVisibilityAttr(this.visibility);
		this.resetContent = this.get("savedContent");
		
		if(tmpName == "" || tmpName == null || tmpName == undefined){
			this.name = null;
		}
		
    },	
    
    /**
	 * 
	 * hook method for width attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setWidthAttr : function(value) {
		if (value != "") {
			this.width = value;
			dojo.style(this.domNode, "width", this.handleLenUint(this.width));
		}
	},
	
	/**
	 * 
	 * hook method for hint attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setHintAttr : function(value){
		this.hint = value;
		if (typeof (this.editingArea) != "undefined" && this.editingArea != null) {
			this.editingArea.parentNode.title = StringUtil.removeWarp(this.getI18NString(value));
		}
	},
	
	/**
	 * 
	 * hook method for value attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	
	_getValueAttr : function(){
		var value = this.inherited(arguments);
		if(dojo.isFF && (value == "<br _moz_editor_bogus_node=\"TRUE\" />" || value == '<br />')){
			return "";
		} else {
			return value;
		}
	},
	
	reset : function(e){
		this.set("value", this.resetContent);
	}

});

}

if(!dojo._hasResource["com.ibm.btt.dijit.Select"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.Select"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
 */

dojo.provide("com.ibm.btt.dijit.Select");






dojo.declare("com.ibm.btt.dijit.Select", [com.ibm.btt.dijit.ValidationTextBox, dijit.form.FilteringSelect,
		com.ibm.btt.dijit.AbstractWidgetMixin], {
	storeDataName : "",
	
	storeData : "",
	
	width : "",
	
	storeURL : "",
	
	labelField : "label",
	
	valueField : "value",
	
	asyncStatus : 0,
	
	asyncErrorMessage : "",
	
	constructor : function () {
		
		this.storeDataFormat = {
			itemLabel : 'label',
			itemValue : 'value'
		};
		
		this.searchAttr = this.storeDataFormat.itemLabel;
		
	},
	
	attributeMap : dojo.delegate(
		dijit.form.FilteringSelect.prototype.attributeMap, {
		visibility : {
			node : "domNode"
		},
		width : {
			node : "domNode"
		}
	}),
	
	postCreate : function () {
		this.inherited(arguments);
		if (!this.storeDataName && this.storeURL) {
			if (this.params.value){
				this.value = this.params.value;
				this._lastValueReported = this.params.value;
				this._resetValue = this.params.value;
			}
			this.loadStoreFromURL(this.storeURL);
		}
		
		this._setWidthAttr(this.width);
	},
	
	postMixInProperties : function () {
		
		var root = this.srcNodeRef;
		var dataObj = {
			identifier : this.storeDataFormat.itemValue,
			label : this.storeDataFormat.itemLabel,
			items : []
		};
		
		var scope = this;
		
		dojo.query("> option", root).forEach(
			dojo.hitch(this, function (node, i) {
				var item = {};
				item[this.storeDataFormat.itemLabel] = scope.getI18NString(dojo.trim(node.innerHTML));
				var value = dojo.attr(node, 'value');
				if (value == '') {
					value = '#';
				}
				item[this.storeDataFormat.itemValue] = value;				
				dataObj.items.push(item);
				/*if(node.selected){
					this.item = item;
				}*/
		}));
		
		if (dataObj.items.length == 0 && this.storeData) {
			if(typeof this.storeData == "string"){
				this.storeData = dojo.fromJson(this.storeData);
			}
			dataObj = this._formatStoreData(this.storeData);
		}
		
		dataObj = this.prepareStoreData(dataObj);
		
		this.item = null;
		if(this.params.value){
			for ( var i = 0; i < dataObj.items.length; i++) {
				if(this.params.value == dataObj.items[i].value){
					this.item = dataObj.items[i];
				}
			}
		}
		
		if(dataObj.items.length == 0){
			var item = {};
			item[this.storeDataFormat.itemValue] = '#';
			item[this.storeDataFormat.itemLabel] = '';
			dataObj.items.push(item);
			/*if (this.value && this.storeURL) {
				this.valueTemp = this.value;
			}*/
			this._lastValueReported = '#';
			this.value = '#';
		}
		
		if(!this.item){
			this.item = dataObj.items[0];
			this.value = this.item.value;
			this._lastValueReported = this.item.value;
		}
		
		/*if (dataObj.items.length == 0 && this.storeData) {
			dataObj = this._formatStoreData(this.storeData);
		}
		if (dataObj.items.length != 0) {
			this.value = this.item && this.item.value ? this.item.value:dataObj.items[0]['value'];
		} else {
			var item = {};
			item[this.storeDataFormat.itemValue] = "null";
			item[this.storeDataFormat.itemLabel] = "";
			dataObj.items.push(item);
			if (this.value && this.storeURL) {
				this.valueTemp = this.value;
			}
			this.value = 'null';
		}*/
		this.store = new dojo.data.ItemFileReadStore({
				data : dataObj
		});
		this.inherited(arguments);
	},

	/**
	 * 
	 * Private hook method for storeData attribute
	 * */
	_setStoreDataAttr : function(value){
		if(typeof value == "string"){
			value = dojo.fromJson(value);
		} 
		this.storeData = value;
	},
	
	setStoreData : function (data) {
		this._onChangeActive = false;
		var newdata = this.prepareStoreData(this._formatStoreData(data));
		this.store.clearOnClose = true;
		this.store.data = newdata;
		this.searchAttr = newdata.label;
		this.store.close();
		this.set('value', this.value);
		this._setBlurValue();
		this._onChangeActive = true;
	},
	
	prepareStoreData : function(data){
		return data;
	},
	
	/**
	 * 
	 * convert loaded object data to data store format data
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_formatStoreData : function (data) {
		
		var resData = {
			identifier : this.storeDataFormat.itemValue,
			label : this.storeDataFormat.itemLabel,
			items : []
		};
		if (data instanceof Array) {
			for (var i = 0; i < data.length; i++) {
				if (data[i] != null
					 && data[i][this.valueField] != null
					 && data[i][this.labelField] != null) {
					var item = {};
					item[this.storeDataFormat.itemValue] = data[i][this.valueField];
					item[this.storeDataFormat.itemLabel] = this
						.getI18NString(data[i][this.labelField]);
					if (item[this.storeDataFormat.itemValue] == ''
						&& item[this.storeDataFormat.itemLabel] == '') {
						item[this.storeDataFormat.itemValue] = '#';
					}
					resData.items.push(item);
				}
			}
		} else if (data instanceof Object) {
			for (var p in data) {
				if (data[p] != null) {
					var item = {};
					item[this.storeDataFormat.itemValue] = data[p];
					item[this.storeDataFormat.itemLabel] = this.getI18NString(p);
					if (item[this.storeDataFormat.itemValue] == ''
						&& item[this.storeDataFormat.itemLabel] == '') {
						item[this.storeDataFormat.itemValue] = '#';
					}
					resData.items.push(item);
				}
			}
		}
		
		return resData;
	},
	
	/**
	 * 
	 * handle the error thrown out during the xhr to load the data
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_handleStoreLoadingError : function (err) {
		
		if (err.status !== undefined) {
			
			this.asyncStatus = err.status;
			this.asyncErrorMessage = err.message;
			this.onAsyncError();
			
		}
	},
	
	onAsyncOK : function () {},
	
	onAsyncError : function () {},
	
	loadStoreFromURL : function (url) {
		
		this.storeURL = url;
		
		var xhrArgs = {
			url : this.storeURL,
			handleAs : "json",
			sync : true,
			load : dojo.hitch(this,
				"_handleStoreLoadingResponse"),
			error : dojo
			.hitch(this, "_handleStoreLoadingError")
		};
		
		this.asyncStatus = 0;
		this.asyncErrorMessage = "";
		dojo.xhrGet(xhrArgs);
	},
	
	/**
	 * 
	 * handle the response of xhr to format and set the return data to store
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_handleStoreLoadingResponse : function (data) {
		
		this.setStoreData(data);
		/*this._onChangeActive = false;
		this.set('value', this.params.value);
		this._onChangeActive = true;*/
		this.onAsyncOK();
		
	},
	
	/**
	 * 
	 * hook method for Visibility attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setVisibilityAttr : function (value) {
		this.visibility = value;
		var iconNode;
		if (typeof(this.domNode.children) != "undefined"
			 && typeof(this.domNode.children[0]) != "undefined"
			 && typeof(this.domNode.children[0].children[1]) != "undefined") {
			iconNode = this.domNode.children[0].children[1];
		} else {
			iconNode = null;
		}
		if (value == "gone") {
			dojo.style(this.domNode, "visibility", "visible");
			dojo.style(this.domNode, "display", "none");
			if (iconNode != null) {
				dojo.style(iconNode, "visibility", "");
			}
		} else if (value == "hidden") {
			dojo.style(this.domNode, "display", "");
			dojo.style(this.domNode, "visibility", "hidden");
			if (iconNode != null) {
				dojo.style(iconNode, "visibility", "hidden");
			}
		} else {
			dojo.style(this.domNode, "display", "");
			dojo.style(this.domNode, "visibility", "visible");
			if (iconNode != null) {
				dojo.style(iconNode, "visibility", "");
			}
		}
	},
	
	/**
	 * 
	 * hook method for width attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setWidthAttr : function (value) {
		if (value != "") {
			this.width = value;
			dojo.style(this.domNode, "width", this.handleLenUint(this.width));
		}
	},
	
	/**
	 * 
	 * hook method for value attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setValueAttr : function (value) {
		var isValueInItems = false;
		this.store.fetchItemByIdentity({
			identity : value,
			onItem : function (item) {
				if (item)
					isValueInItems = true;
			}
		});
		
		var itemArray = this.store._getItemsArray();
		if(itemArray){
			dojo.some(itemArray, function(item) {
				if(item.value && item.value[0] && item.value[0] == value){
					isValueInItems = true;
					return false;
				}
	        });
		}
		
		if (!isValueInItems) {
			var itemArray = this.store._getItemsArray();
			if (itemArray.length == 0) {
				value = '';
			} else {
				var id = this.store.getIdentity(itemArray[0]);
				this.store.fetchItemByIdentity({
					identity : id,
					onItem : dojo.hitch(this, function (item) {
						if (item) {
							isValueInItems = true;
							value = item.value && item.value[0] ? item.value[0] : null;
							this.set('item', item);
						}
					})
				});
			}
			this.value = value;
			this._lastValueReported = value;
		}
		this.inherited(arguments);
	},

	/**
	 * 
	 * hook method for value attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_getValueAttr : function () {
		var value = this.inherited(arguments);
		if(value == null || value == '#'){
			return '';
		}else{
			return value;
		}
	},
	
	/**
	 * 
	 * hook method for item attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 *              Customer can not use this method directly, they should use set('item', item) instead.
	 * */
	_setItemAttr : function(){
		this.inherited(arguments);
		this.valueNode.value = this.get('value');
	}
	
});

}

if(!dojo._hasResource["com.ibm.btt.dijit.StringTextBox"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.StringTextBox"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit.StringTextBox"); 



dojo.requireLocalization("com.ibm.btt.dijit", "TextBox", null, "ROOT");

dojo.declare("com.ibm.btt.dijit.StringTextBox",[com.ibm.btt.dijit.ValidationTextBox],{
	
	maximumLength : NaN,
	minimumLength : NaN,
	validCharacters : "",
	password : false,
	
	postMixInProperties : function(){
		this.inherited(arguments);	
		if(this.password){
			this.type = "password";
		}
	},
	
	postCreate : function(){
		this.inherited(arguments);
		this.attr('value',this.attr('value'));
	},
	
	validator: function(/*anything*/value, /*dijit.form.ValidationTextBox.__Constraints*/constraints){	
		var bundle = new com.ibm.btt.util.I18nBundle("com.ibm.btt.dijit", "TextBox");
		if(this.attr('value')!="" && (!isNaN(this.minimumLength)) && this.attr('value').length < this.minimumLength){	
			this.invalidMessage = bundle.getMessage("stringMinMessage",{value:this.minimumLength});
			return false;
		}
		else if(this.attr('value')!="" && (!isNaN(this.maximumLength)) && this.attr('value').length > this.maximumLength){
			this.invalidMessage = bundle.getMessage("stringMaxMessage",{value:this.maximumLength});
			return false;
		}
		else{
			return this.inherited(arguments);
		}
	},

	/**
	 * 
	 * hook method for value attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setValueAttr : function(value){
		if (value != null && value != undefined) {
			value = this.getI18NString(value);
			value = value.replace(/&amp;/g, '&').replace(/&lt;/g, '<')
			this.value = value;
			this.inherited(arguments);
		}
	}
	
});

}

if(!dojo._hasResource["com.ibm.btt.dijit.TextArea"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.TextArea"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/


dojo.provide("com.ibm.btt.dijit.TextArea");





dojo.declare("com.ibm.btt.dijit.TextArea", [com.ibm.btt.dijit.ValidationTextBox, 
		dijit.form.SimpleTextarea], {
	
	width : "",
	
	height : "",
	
	attributeMap: dojo.delegate(dijit.form.SimpleTextarea.prototype.attributeMap, {
		
		visibility : {
			node : "domNode"
		},
		
		width : {
			node : "domNode"
		},
		
		height : {
			node : "domNode"
		}
		
	}),
	
	validator: function(/*anything*/value, /*dijit.form.ValidationTextBox.__Constraints*/constraints){
		if(! (!this.required || !this._isEmpty(value))){
			//this.promptMessage = dojo.i18n.getLocalization("com.ibm.btt.dijit", "TextBox").requiredFieldMessage;
			return false;
		}
		/*if(!(new RegExp("^(?:" + this.regExpGen(constraints) + ")"+(this.required?"":"?")+"$")).test(value)){
			this.invalidMessage = dojo.i18n.getLocalization("com.ibm.btt.dijit", "TextBox").regularExpressionMessage;
			return false;
		}*/
		return true;
	},
	
	/**
	 * 
	 * hook method for Visibility attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setVisibilityAttr : function(value){
		this.visibility = value;
		if (value == "gone") {
			dojo.style(this.domNode, "visibility", "visible");
			dojo.style(this.domNode, "display", "none");
		} else if (value == "hidden") {
			dojo.style(this.domNode, "display", "");
			dojo.style(this.domNode, "visibility", "hidden");
		} else {
			dojo.style(this.domNode, "display", "");
			dojo.style(this.domNode, "visibility", "visible");
		}
	},
	
	/**
	 * 
	 * hook method for width attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setWidthAttr : function(value) {
		if (value != "") {
			this.width = value;
			dojo.style(this.domNode, "width", this.handleLenUint(this.width));
		}
	},

	/**
	 * 
	 * hook method for height attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setHeightAttr : function(value) {
		if (value != "") {
			this.height = value;
			dojo.style(this.domNode, "height", this.handleLenUint(this.height));
		}
	},

	/**
	 * 
	 * hook method for value attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setValueAttr : function(value){
		value = this.getI18NString(value);
		this.inherited(arguments);
	}
	
});

}

if(!dojo._hasResource["com.ibm.btt.dijit.Tree"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.Tree"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
 */

dojo.provide("com.ibm.btt.dijit.Tree");






dojo.declare("com.ibm.btt.dijit.Tree", [ dijit.Tree,
		com.ibm.btt.dijit.AbstractWidgetMixin], {

	//data store name, the form will check this data name, if it defined and not be null
	//the form will invoke the setStoreData function to set the store data for the tree.

	storeDataName : "",
	
	name : "",

	storeData : null,

	showRoot : false,
	
	value : "",
	
	_selectedItem : null,
	
	width : "",
	
	height : "",
	
	persist: false,
	
	templateString: dojo.cache("com.ibm.btt.dijit", "templates/Tree.html", "<div class=\"dijitTree dijitTreeContainer\" waiRole=\"tree\" style=\"overflow:auto\"\r\n\tdojoAttachEvent=\"onkeypress:_onKeyPress\">\r\n\t<div class=\"dijitInline dijitTreeIndent\" style=\"position: absolute; top: -9999px\" dojoAttachPoint=\"indentDetector\"></div>\r\n\t<input type=\"hidden\" dojoAttachPoint=\"formNode\"/>\r\n</div>\r\n"),
	
	attributeMap : dojo.delegate(dijit.Tree.prototype.attributeMap, {

		visibility : {
			node : "domNode"
		},
		
		name : {
			node : "formNode"
		},
		
		value : {
			node : "formNode"
		},
		
		width : {
			node : "formNode"
		},
		
		height : {
			node : "formNode"
		}

	}),

	postMixInProperties : function() {
		this.inherited(arguments);
		this.loadStoreData();
	},
	
	postCreate : function(){
		this.inherited(arguments);
		this.treeEvents = [];
		var _this = this;
		this.treeEvents.push(
			dojo.connect(this,"onClick",this,function(item){
				_this.set("value", item.id[0]);
			})
		);
		this._lastValue = this.value;
	},
	
	onLoad : function(){
		this.inherited(arguments);
		this._expandNode(this.tree.rootNode.getChildren()[0], false);
		this.reset();
		
		if (this.value != "") {
			var tmppaths = this.value.split(".");
			var tmpPath = tmppaths[0];
			for ( var i = 1; i < tmppaths.length; i++) {
				var n = this._itemNodesMap[tmpPath];
				if (n) {
					this._expandNode(n[0], false);
				}
				tmpPath += "." + tmppaths[i];
			}
			var nodes = this._itemNodesMap[this.value];
			this._expandNode(nodes[0], false);
			nodes[0].setSelected(true);
		}
		
	},

	/**
	 * 
	 * convert the a object data to data store format data. The full path id of context structure
	 * will be used as the id(identify of store) of each data item.   
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_parseStoreData : function(parent, data) {
		
		this.firstSelectedItem=null; // reset firstSelectedItem when ajax submit
		
		var result = [];
		for ( var name in data) {
			// create new object for tree node.
			var item = {};
			// set the full path id to be the new id of this tree node.
			if (parent != null && typeof (parent.id) != "undefined") {
				item.id = parent.id + "." + name;
			} else {
				item.id = name;
			}
			// set the id to be the label which will display on the tree node.
			item.label = data[name]["label"];
			item.value = data[name]["value"];
			if ( data[name]["children"]) {
				item.children = this._parseStoreData(item, data[name]["children"]);
			}
			result.push(item);
		}
		
		//console.log(dojo.toJson(result));
		return result;
	},

	/**
	 * 
	 * override the default getLabel method to support NLS
	 * 
	 * @tag public
	 * 
	 * */
	getLabel: function(item){
		return	I18nUtil.getI18nString(this.inherited(arguments));
	},
	
	
	loadStoreData : function(){
		var dataItems = this._parseStoreData(null, this.storeData);

		if(!this.model) {
			var data = {
					'identifier' : 'id',
					'label' : 'label',
					'items' : dataItems
				};
			var store = new dojo.data.ItemFileWriteStore( {
				'data' : data
			});
			
			this.model = new dijit.tree.ForestStoreModel( {
				'store' : store
			});
		} else {
			var tree = this;
			var store = this.model.store;
			this.model.store.fetch({queryOptions:{deep:true},  onComplete: function(items, request) {
				for (var i = items.length - 1; i >= 0; i--){
					store.deleteItem(items[i]);
				  }
			}});
			
			store.save();
			
			(function(pItems, parentItem) {
				for(var i = 0; i < pItems.length; i ++) {
					
					var children;
					if(pItems[i].children && pItems[i].children.length) {
						children = pItems[i].children;
						pItems[i].children = [];
					} else {
						children = null;
					}
					if(parentItem) 
						var parent = store.newItem(pItems[i], {parent:parentItem, attribute:"children"});
					else 
						var parent = store.newItem(pItems[i]);
					if(children) {
						arguments.callee(children, parent);
					}
					
				}
				
			})(dataItems);
			
			store.save();
		}
	},
	 
	// btt context data for data store.
	/**
	 * 
	 * load JavaScript object data to tree store, 
	 * this store may be invoked when page loading or ajax response with tree data
	 * 
	 * @tag public
	 * 
	 * */
	setStoreData : function(data) {
		var tempData = {};
		tempData[this.storeDataName] = data
		this.storeData = tempData;
		this.loadStoreData();
		
		if(this.dndController) {
			this.dndController.destroy();
			var params={};
			for(var i=0; i<this.dndParams.length;i++){
				if(this[this.dndParams[i]]){
					params[this.dndParams[i]] = this[this.dndParams[i]];
				}
			}
			this.dndController = new this.dndController.constructor(this, params);
		}
		this.set("paths", []);
	},
	
	destroy : function(){
		this.inherited(arguments);
		for ( var i = 0; this.treeEvents.length; i++) {
			dojo.disconnect(this.treeEvents.pop());
		}
		this.treeEvents = null;
	},
	
	/**
	 * 
	 * hook method for value attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setValueAttr : function(value){
		dojo.forEach(this.get("selectedNodes"), function(widget){
			widget.setSelected(false);
		});
		
		if(this._lastValue){
			var node = this._itemNodesMap[this._lastValue];
			if(node){
				node[0].setSelected(false);
			}
		}
		
		
		this.set("paths", []);
		var nodes = this._itemNodesMap[value];
		/*this.value = "";
		this.formNode.value = "";*/
		
		this.value = value;
		this.formNode.value = value;
		
		if(nodes){
			this.set("selectedNodes", nodes);	
			this._selectedItem = nodes[0].item;
		}
	},
	
	/**
	 * 
	 * return the label of selected tree item, this label was not 
	 * translated into native language if the data applied NLS support
	 * 
	 * @tag public
	 * 
	 * */
	getSelectedLabel : function(){
		if(this._selectedItem){
			return this._selectedItem.label[0];
		}else{
			return undefined;
		}
	},
	
	/**
	 * 
	 * return the label of selected tree item, this label was already translated
	 * into native language if the data applied NLS support
	 * 
	 * @tag public
	 * */
	getSelectedLabelNLS : function(){
		if(this._selectedItem){
			return I18nUtil.getI18nString(this._selectedItem.label[0]);
		}else{
			return undefined;
		}
	},
	
	/**
	 * 
	 * return the value of selected item 
	 * 
	 * @tag public
	 * */
	getSelectedValue : function(){
		if(this._selectedItem){
			return this._selectedItem.value[0];
		}else{
			return undefined;
		}
	},
	
	isFocusable:function(){
		return (!this.disabled) && (!this.readOnly) && (dojo.style(this.domNode, "display") !== "none") && (dojo.style(this.domNode, "visibility") !== "hidden");
	},
	
	reset : function() {
		this.inherited(arguments);
		if (this.params.value) {
			this.set("value", this.params.value);
		}else{
			this.set("value", "");
		}
	},

	getTooltip: function(/*dojo.data.Item*/ item){
		var tip = this.getI18NString(this.hint);
		if (tip == undefined)
			tip = "";
		this.hint = tip;
		return tip;
	},
	
	/**
	 * 
	 * hook method for hint attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setHintAttr : function(value){
		this.hint = value;
		var title = StringUtil.removeWarp(this.getI18NString(value));
		this.domNode.title = title;
		if(this.rootNode){
			this._setHintForAllChild(this.rootNode, title);
		}
	},
	
	/**
	 * 
	 * hook method for hint attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setHintForAllChild : function(root, hint){
		var _this = this;
		root.set("tooltip", hint);
		root.set("hint", hint);
		if(root.hasChildren()){
			dojo.forEach(root.getChildren(), function(child, idx){
				_this._setHintForAllChild(child, hint);
			});
		}
	},
	
	/**
	 * 
	 * hook method for width attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setWidthAttr : function(value) {
		if (value != "") {
			this.width = value;
			dojo.style(this.domNode, "width", this.handleLenUint(this.width));
		}
	},

	/**
	 * 
	 * hook method for height attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setHeightAttr : function(value) {
		if (value != "") {
			this.height = value;
			dojo.style(this.domNode, "height", this.handleLenUint(this.height));
		}
	},
	
	/**
	 * 
	 * hook method for Visibility attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setVisibilityAttr : function(value){
		this.inherited(arguments);
		this.resize();
	}	
});

}

if(!dojo._hasResource["com.ibm.btt.event._ConditionMixin"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.event._ConditionMixin"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2012 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.event._ConditionMixin"); 

/**
 * 
 * This is an internal class which is used to provide the condition reuse function
 * User can register conditions into engine instance from several different files with url
 * */
dojo.declare("com.ibm.btt.event._ConditionMixin", null,{
	
	/**
	 * 
	 * internal variable which is used to keep the all the conditions loaded form the js
	 * 
	 * @tag private this is a internal property, may be changed or removed in later version
	 *              please do not use this property in customer code.
	 * */
	_conditionMap : {},
	
	
	/**
	 * 
	 * register the condition to engine instance from the specified url
	 * 
	 * @tag public 
	 * */
	registerCond : function(url) {
		if (url) {
			var xhrArgs = {
				'url' : url,
				handleAs : "json",
				sync : true,
				load : dojo.hitch(this, "_loadCond"),
				error : dojo.hitch(this, "_loadCondError", url)
			};
			dojo.xhrGet(xhrArgs);
		} else {
			console.error("The argument can not be null.");
		}
	},
	
	/**
	 * 
	 * internal method to load condition js from url
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this property in customer code.
	 * */
	_loadCond : function(cond){
		if(cond){
			for (var name in cond) {
				if (name && cond[name] && typeof (cond[name]) == 'function') {
					this._conditionMap[name] = cond[name];
				}
			}
		}
	},
	
	/**
	 * 
	 * internal method to handle the error when load condition js
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this property in customer code.
	 * */
	_loadCondError : function(url, error){
		console.error("Fail to load the condition on " + url + ", error : " + error);
	},
	
	/**
	 * 
	 * public method used to execute the condition with given name and arguments
	 * 
	 * @param this first argument is the condition name and the rest of arguments are condition execution arguments
	 * 
	 * @tag public 
	 * 
	 * */
	executeCond: function(){
		var name = arguments[0];
		var args = [];
		var length = Number(arguments.length);
		var i = 1;
		while (i < length) {
			args.push(arguments[i]);
			i++;
		}
		try{
			if(this._conditionMap[name]){
				return this._conditionMap[name].apply(this, args);
			} else {
				console.error("Condition with specified name is not found. condition=" + name);
			}
		}catch(e){
			console.error("An error occured while executing the condition " + name + ", error " + e);
		}
	},
	
	
	executeDeprecatedCond: function(){
		var name = arguments[0];
		console.warn("The condition [" + name +"] is deprecated.");
		this.executeCond(arguments);
	}
});

}

if(!dojo._hasResource["com.ibm.btt.event.Engine"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.event.Engine"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp. 2012 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
*/

dojo.provide("com.ibm.btt.event.Engine");



dojo.declare("com.ibm.btt.event.Engine", [com.ibm.btt.event._ConditionMixin], {

	monitor : null,
	
	/**
	 * 
	 * handler array for dojo connect method,
	 * used for unregister the event when clear the rules or destroy the engine
	 * 
	 * @tag private this is a internal property, may be changed or removed in later version
	 *              please do not use this property in customer code.
	 * */
	_ruleEvents : [],
	
	/**
	 * 
	 * an object used to save the reference of registered rules
	 * 
	 * @tag private this is a internal property, may be changed or removed in later version
	 *              please do not use this property in customer code.
	 * */
	_ruleMaps : {},
	
	setMonitor : function(ecaMonitor){
		 this.monitor = ecaMonitor;
	},
	
	registerRules : function(rules) {
		this._formOnLoaded = [];
		for ( var i = 0; i < rules.length; i++){
			if (rules[i].evts) {
				for ( var j = 0; j < rules[i].evts.length; j++) {
					this._registerEvent(rules[i], rules[i].evts[j]);
				}
			}
			if(rules[i].type && rules[i].type == "AG"){
				this._ruleMaps[rules[i].name] = rules[i];
			}
		}
		
		for ( var i = 0; i < this._formOnLoaded.length; i++) {
			if (this._formOnLoaded[i].onLoaded) {
				this._formOnLoaded[i].onLoaded();
			}
		}
		
		this._formOnLoaded = undefined;
		delete this._formOnLoaded;
	},

	/**
	 *
	 * register single rule
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_registerEvent : function(rule, event) {
		
		var obj;
		
		//check if the widget id contains special character "."
		//if the id contains "." that's mean we are listening the subwidget in a complex widget
		//engine need to use getWidget mehtod of this widget to get the instance of subwidget
		if (event.id.lastIndexOf(".") == -1) {
			obj = dijit.byId(event.id);
		} else {
			var parentId = event.id.substring(0,event.id.indexOf("."));
			var childId = event.id.substring(event.id.indexOf(".") + 1, event.id.length);
			obj = dijit.byId(parentId);
			if(obj && obj.getWidget){
				obj = obj.getWidget(childId);
			} else {
				console.error("Failed to register event '" + event.id + "', " +
						"parent widget mush provide getWidget(id) widget to support subwidget listening funcion.");
				return;
			}
		}
		
		//use dojo connect to listen and trigger the event
		var _event = dojo.connect(obj, event.e, this, function(evt) {
			
			if (this.monitor != null) {
				this.monitor.monitorStartRule(event, rule);
			}
			
			var result = this._executeCondition(rule, evt);
			
			if (this.monitor != null) {
				this.monitor.monitorCondition(event, rule, result);
			}
			
			this._executeAction(result, rule, evt);
			
			if (this.monitor != null) {
				this.monitor.monitorEndRule(event,  rule);		
			}
			
		});
		

		if (event.e === "onLoaded") {
			var i;
			for ( i = 0; i < this._formOnLoaded.length; i++) {
				if (this._formOnLoaded[i] == obj) {
					break;
				}
			}
			if (i == this._formOnLoaded.length) {
				this._formOnLoaded.push(obj);
			}
		}
		
		this._ruleEvents.push(_event);
	},
	
	/**
	 *
	 * execute the condition of single one rule and get the result
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_executeCondition : function(rule, evt) {
		var result = true;
		if (rule && rule.cond) {
			try{
				result = rule.cond.call(this, evt);
			} catch (e) {
				console.error("An error occured while ECA condition excuting." + e.toString());
			}
		}
		return result;
	},
	
	/**
	 *
	 * execute the action depends on the condition execution result
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_executeAction : function(result, rule, evt){
		if (result) {
			if (rule.onTrue) {
				try {
					rule.onTrue.call(this, evt);
				} catch (e) {
					console.error("An error occured while ECA on true state excuting." + e.toString());
				}
			}
		} else {
			if (rule.onFalse) {
				try {
					rule.onFalse.call(this, evt);
				} catch (e) {
					console.error("An error occured while ECA on false state excuting." + e.toString());
				}
			}
		}
	},
	
	executeAG : function(name) {
		if(name){
			var rule = this._ruleMaps[name];
			if (rule) {
				if(this.monitor && this.monitor.monitorStartAG){
					this.monitor.monitorStartAG(rule);
				}
				var result = this._executeCondition(rule);
				if(this.monitor && this.monitor.monitorAGCondition){
					this.monitor.monitorAGCondition(rule, result);
				}
				this._executeAction(result, rule);
				if(this.monitor && this.monitor.monitorEndAG){
					this.monitor.monitorEndAG(rule);
				}
			} else {
				console.error("can not find corresponding action group with given name '" + name + "'");
			}
			
		} else {
			console.error("Input argument name to execute an action group can not be null or undefined or empty.");
		}
	},
	
	clearRules : function() {
		while (this._ruleEvents.length > 0) {
			dojo.disconnect(this._ruleEvents.pop());
		}
		this._ruleMaps = {};
	},

	setPW : function(id, property, value) {
		if (this.monitor != null) {
			this.monitor.monitorSetPropertyAction(id, property, value);
		}
		dijit.byId(id).set(property, value);
	},

	getPW : function(id, property) {
		var value=dijit.byId(id).get(property);
		if (this.monitor != null) {
			this.monitor.monitorGetPropertyAction(id, property, value);
		}
		return value;
	},

	getW : function(id) {
		return dijit.byId(id);
	},
	
	runWF: function( id, functionName, parameter){		
		
		var targetObj = dijit.byId(id);
		var args = [];
		for ( var i = 2; i < arguments.length; i++) {
			args[i - 2] = arguments[i];
		}

		var result = targetObj[functionName].apply(targetObj, args);

		if (this.monitor != null) {
			this.monitor.monitorCallFunctionAction(id, functionName, args,
					result);
		}
		
		return result;
	},
	
	destroy : function() {
		this.clearRules();
		this._ruleEvents = undefined;
		this.monitor = undefined;
		this._ruleMaps = undefined;
	}

});

}

if(!dojo._hasResource["com.ibm.btt.dijit.GridDijit"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.GridDijit"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit.GridDijit"); 










/**
 * BTT base cell widget
 * - hooks the validate related logic for form submit button validation.
 */
dojo.declare("dojox.btt.grid.cells.BaseCellWidget",dojox.grid.cells._Widget,{
		

	createWidget: function(inNode, inDatum, inRowIndex){
		var widget = this.inherited(arguments);
		var _this = this;
		widget.watch("state", function(attr, oldVal, newVal){
			_this.grid._set("state", _this.grid._getState());
			
		});
		return widget;
	}
	
});


dojo.declare("dojox.btt.grid.cells.Label", dojox.btt.grid.cells.BaseCellWidget, {

	formatter : function(inData) {
		return I18nUtil.getI18nString(inData);
	}	
	
});

dojo.declare("dojox.btt.grid.cells.DateTextBox", dojox.btt.grid.cells.BaseCellWidget, {

	widgetClass: com.ibm.btt.dijit.DateTextBox,

	formatter : function(inData) {

		if(inData == undefined || inData == null || inData == "" || inData == "null"){
			return "";
		}

		if(this.widget == null) {
			this.widget = this.createWidget(dojo.create('div'), "");
			//this.widget.set("value", null);
		}

		var date;

		if(typeof inData == 'string') {
			if(this.widget && this.widget.pattern){
				date = this.widget.parse(inData, this.widget.constraints);
			} else {
				var constraints = this.widget.constraints;
				constraints["datePattern"] = "yyyy-MM-dd";
				date = this.widget.parse(inData, constraints);
			}
		} else {
			date = inData;
		}
		return this.widget.format(date, this.widget.constraints);
	},


	getWidgetProps: function(inDatum){
		return dojo.mixin(this.inherited(arguments), {
			value: new Date(inDatum)
		});
	},

	setValue: function(inRowIndex, inValue){

		if(inValue == undefined || inValue == null || inValue == "" || inValue == "null"){
			this.widget.set('value', null);
			return;
		}

		if(this.widget){
			if(typeof inValue == "string") {
				if(this.widget && this.widget.pattern){
					this.widget.attr('value', this.widget.parse(inValue, this.widget.constraints));
				} else {
					this.widget.attr('value', new Date(inValue));
				}
			} else {
				this.widget.attr('value', inValue);
			}
		}else{
			this.inherited(arguments);
		}
	},

	getValue: function(inRowIndex){
		if(this.widget.isValid()){
			var value = this.widget.get('value');
			if(value){
				return value;
			} else {
				return "";
			}
		}else{
			this.widget.displayMessage(this.widget.getErrorMessage(true));		//DISPLAY THE ERROR MESSAGE TO GIVE END USER FEEDBACK
			return undefined;
		}
	},

	formatNode : function(inRowIndex, inValue){
		this.inherited(arguments);
		//this.widget.set("value", null);
		this.setValue(inRowIndex, inValue);
	}

});


dojo.declare("dojox.btt.grid.cells.CurrencyTextBox", dojox.btt.grid.cells.BaseCellWidget, {
	
	widgetClass: com.ibm.btt.dijit.CurrencyTextBox,
	
	formatter : function(inData) {
		if(this.widget == null) {
			this.widget = this.createWidget(dojo.create('div'), "");
		}
		
		//deal with null value
		if(inData === null){
			return "";
		}
		
		if(typeof inData == 'string') {
			inData = Number(inData);
		}
		this.widget.attr('value', inData);
		
		return dojo.number.format(inData, this.widget.constraints);
	},
	
	getWidgetProps: function(inDatum){
		return dojo.mixin(this.inherited(arguments), {
			value: new Number(inDatum)
		});
	},
	
	getValue: function(inRowIndex){
		if(this.widget.isValid()){
			return this.widget.get('value'); 
		}else{
			this.widget.displayMessage(this.widget.getErrorMessage(true));		//DISPLAY THE ERROR MESSAGE TO GIVE END USER FEEDBACK
			return undefined;
		}
	}		
	
});

dojo.declare("dojox.btt.grid.cells.NumberTextBox", dojox.btt.grid.cells.BaseCellWidget, {
	
	widgetClass: com.ibm.btt.dijit.NumberTextBox,
	
	formatter : function(inData) {
		if(this.widget == null) {
			this.widget = this.createWidget(dojo.create('div'), "");
		}
		
		//deal with null value
		if(inData === null || inData === ""){
			return "";
		}
		
		this.widget.set('value', inData);
		
		if(typeof inData == 'string') {
			var tmpData = this.widget.parse(inData, this.widget.constraints);;			//FIXME, error handling for not a valid number?
			if(isNaN(tmpData)){
				tmpData = Number(inData);
			}
			if(isNaN(tmpData)){
				return inData;
			}else{
				return this.widget.format(tmpData, this.widget.constraints);
			}
		} else {
			return this.widget.format(inData, this.widget.constraints);
		}
		
	},
	
	getWidgetProps: function(inDatum){
		return dojo.mixin(this.inherited(arguments), {
			value: new Number(inDatum)
		});
	},
	
	getValue: function(inRowIndex) {
		if(this.widget.isValid()){
			var value = this.widget.get('value');
			if(isNaN(value)){
				return "";
			} else {
				return value;
			}
		}else{
			this.widget.displayMessage(this.widget.getErrorMessage(true));		//DISPLAY THE ERROR MESSAGE TO GIVE END USER FEEDBACK
			return undefined;
		}
	}
	
});


dojo.declare("dojox.btt.grid.cells.CheckBox", dojox.btt.grid.cells.BaseCellWidget, {
	widgetClass: com.ibm.btt.dijit.CheckBox,
	
	getValue: function(){
		return this.widget.attr('value');//isChecked ? this.widget.checkedValue : this.widget.unCheckedValue;//this.widget.checked;
	},
	setValue: function(inRowIndex, inValue){

		if(inValue && this.widget){
			if( inValue.toString() == this.widget.checkedValue.toString() ) {
				this.widget.attr("isChecked", true);
			} else {
				this.widget.attr("isChecked", false);
			} 
		}else{
			this.inherited(arguments);
		}
		
	},
	sizeWidget: function(inNode, inDatum, inRowIndex){
		return;
	}
});


dojo.declare("dojox.btt.grid.cells.StringTextBox", dojox.btt.grid.cells.BaseCellWidget, {
	
	widgetClass: com.ibm.btt.dijit.StringTextBox,
	
	getValue: function(inRowIndex){
		if(this.widget.isValid()){
			return this.widget.attr('value'); 
		}else{
			this.widget.displayMessage(this.widget.getErrorMessage(true));		//DISPLAY THE ERROR MESSAGE TO GIVE END USER FEEDBACK
			return undefined;
		}
	},
	
	formatter : function(inData) {
		return I18nUtil.getI18nString(inData);
	}
	
});

dojo.declare("dojox.btt.grid.cells.ComboBox", dojox.btt.grid.cells.BaseCellWidget, {

	widgetClass: com.ibm.btt.dijit.ComboBox,

	getValue: function(){
		var e = this.widget;
		// make sure to apply the displayed value
		e.attr('displayedValue', e.attr('displayedValue'));
		return e.attr('value');
	}
});


dojo.declare("dojox.btt.grid.cells.Select", dojox.btt.grid.cells.BaseCellWidget, {

	widgetClass: com.ibm.btt.dijit.Select,
	
	/**
	 * Custom comparator to sort the values in a Select column
	 * Sorting by label
	 * @param field1
	 * @param field2
	 * @returns {Number}
	 */
	comparator: function(field1, field2){
		var store = this.widget.store;
		
		//var item1 = store.fetchItemByIdentity({"identity":field1});
		var item1 = store._itemsByIdentity[field1];
		var v1 = item1 ? item1.label[0]:field1;
		
		//var item2 = store.fetchItemByIdentity({"identity":field2});
		var item2 = store._itemsByIdentity[field2];
		var v2 = item2 ? item2.label[0]:field2;
		
		if(v1 > v2){
			return 1;
		} else if(v1 < v2){
			return -1;
		} else {
			return 0;
		}
	},

	formatter : function(inData) {
		
		if(this.widget == null) {
			this.widget = this.createWidget(dojo.create('div'), "");
		}
		
		if((inData === null) || (inData === "")){
			return "";
		}
		
		// if the cell value is in Select, then display its label, 
		// otherwise, display the original value.
		var store = this.widget.store;
		//var item = store.fetchItemByIdentity({"identity":inData});
		var item = store._itemsByIdentity[inData];
		if(item){
			this.widget.set('value', inData);
			return item.label[0];
		}else{
			return inData;
		}
	}
});

dojo.declare("dojox.btt.grid.cells.Image", dojox.btt.grid.cells.BaseCellWidget, {
	
	widgetClass: com.ibm.btt.dijit.Image,
	
	formatter : function(inData) {
		var html = '<img src="' + inData + '"';
		
		if (this.widgetProps && this.widgetProps.imageWidth) {
			html += ' width="'+ this.grid.handleLenUint(this.widgetProps.imageWidth) +'"'; 
		}
		
		if (this.widgetProps && this.widgetProps.imageHeight) {
			html += ' height="'+ this.grid.handleLenUint(this.widgetProps.imageHeight) +'"'; 
		}
		
		html += '/>';
		
		return html;
	}
	
});


dojo.declare("dojox.btt.grid.cells.LabelFromList", dojox.btt.grid.cells.BaseCellWidget,{
	constructor : function(prop){
		var _this = this;
		if(prop.storeData){
			_this.storeData = prop.storeData;
		}else{
			var storeURL = prop.storeURL ? prop.storeURL : prop.widgetProps.storeURL;
			if(storeURL){
				var xhrArgs = {
					url : storeURL,
					handleAs : "json",
					sync : true,
					load : function(arg) {
						_this.storeData = arg;
					},
					error: function(e){
						console.error("dojox.btt.grid.cells.LabelFromList: Failed to get the list file from " + storeURL);
					}
				};
				dojo.xhrGet(xhrArgs);
			}else{
				_this.storeData = {};
			}
		}
		if(_this.storeData){
			var tempData = {};
			for(var key in _this.storeData){
				if (_this.storeData[key] != null
						&& typeof (_this.storeData[key]) != "undefined") {
					tempData[_this.storeData[key]] = key;
				}
			}
			_this.storeData = tempData;
		}
	},
	
	formatter : function(inData) {
		if (this.storeData && this.storeData[inData]) {
			return '<label>' + I18nUtil.getI18nString(this.storeData[inData]) + '</label>';
		} else if (inData && inData === null && inData === "null") {
			return "";
		} else {
			return '<label>' + inData + '</label>';
		}
	}
	/*, defect 27138
	comparator : function(a, b){
		var a = this.storeData[a];
		var b = this.storeData[b];
		var r = -1;
		if(a === null){
			a = undefined;
		}
		if(b === null){
			b = undefined;
		}
		if(a == b){
			r = 0;
		}else if(a > b || a == null){
			r = 1;
		}
		return r; //int {-1,0,1}
	}
	*/
	
});

dojo.declare("dojox.btt.grid.cells._LinkMixin", null, {
	constructor : function(prop){
		if (prop.widgetProps.action == "op"
			|| prop.widgetProps.action == "flow") {
			var bttParam = dojo.fromJson(prop.widgetProps.bttParams);
			var url = ["Request?"];
			for (var key in bttParam) {
				if (bttParam[key] != null) {
					url.push(key);
					url.push("=");
					url.push(bttParam[key]);
					url.push("&");
				}
			}
			url.pop();
			this.widgetProps.baseUrl = url.join('');
		}
	},

	onClick : function(e){
		
	},
	_onClick : function(e){
		if (e.target.tagName == this._tagartTagName) {
			var startWith = function(src, str) {
				var reg = new RegExp("^" + str);
				return reg.test(src);
			};
			var data = this.grid.store._arrayOfAllItems[e.rowIndex];
			var rowData = {};
			for ( var key in data) {
				if (data[key] != null && !startWith(key, "_")) {
					rowData[key] = data[key][0];
				}
			}
			this.grid._cellEventRowData = rowData;
			this.onClick(e);
			if (this.widgetProps && this.widgetProps.action === "link") {
				window.open(this.widgetProps.links[e.rowIndex]);
			} else if (this.widgetProps && (this.widgetProps.action === "op"
				|| this.widgetProps.action === "flow")) {
				var params = [];
				for ( var key in rowData) {
					if (rowData[key] != null) {
						params.push(key);
						params.push("=");
						params.push(rowData[key]);
						params.push("&");
					}
				}
				params.pop();
				var url = this.widgetProps.baseUrl + "&" + params.join('');
				window.open(url);
			} else {
	
			}
		}
	}
});

dojo.declare("dojox.btt.grid.cells.Link", [dojox.btt.grid.cells.BaseCellWidget, dojox.btt.grid.cells._LinkMixin], {
	
	_tagartTagName : "A",
	
	formatter : function(inData, arg1, arg2, arg3) {
		if(this.field){
			if (inData != null && inData != undefined && inData != "" && inData != "null") {
				return "<a href='#"+arg1+"'>" + inData + "</a>";
			} else {
				return "";
			}
		}else if(this.widgetProps && this.widgetProps.label){
			return "<a href='#"+arg1+"'>" + this.grid.getI18NString(this.widgetProps.label) + "</a>";
		}else{
			return "";
		}
	}
	
});

dojo.declare("dojox.btt.grid.cells.Button", [dojox.btt.grid.cells.BaseCellWidget, dojox.btt.grid.cells._LinkMixin], {

	_tagartTagName : "SPAN",
	
	formatter : function(inData) {
	
		if(this.field){
			if (inData != null && inData != undefined && inData != "" && inData != "null") {
				return "<span class=\"dijit dijitReset dijitInline dijitButton\"><span class=\"dijitReset dijitInline dijitButtonNode\">"
				+ "<div style=\"background: none repeat scroll 0% 0% transparent; -moz-user-select: none;\" class=\"dijitReset dijitStretch dijitButtonContents\">"
				+ "<span class=\"dijitReset dijitInline dijitButtonText\">"
				+ inData + "</span></div></span></span>";
			} else {
				return "";
			}
		}else if(this.widgetProps && this.widgetProps.label){
			inData =  this.grid.getI18NString(this.widgetProps.label);
			return "<span class=\"dijit dijitReset dijitInline dijitButton\"><span class=\"dijitReset dijitInline dijitButtonNode\">"
			+ "<div style=\"background: none repeat scroll 0% 0% transparent; -moz-user-select: none;\" class=\"dijitReset dijitStretch dijitButtonContents\">"
			+ "<span class=\"dijitReset dijitInline dijitButtonText\">"
			+ inData + "</span></div></span></span>";
		}else{
			return "";
		}
	
		
	}
	
});

}

if(!dojo._hasResource["com.ibm.btt.dijit.QueryReadStore"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.QueryReadStore"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2011 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
 */

dojo.provide("com.ibm.btt.dijit.QueryReadStore"); 



dojo.declare("com.ibm.btt.dijit.QueryReadStore", dojox.data.QueryReadStore,{
	
	bttParams :{},
	
	/**
	 * 
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_fetchItems: function(request, fetchHandler, errorHandler){

		var serverQuery = request.serverQuery || request.query || {};
		//Need to add start and count
		if(!this.doClientPaging){
			serverQuery.start = (request.start || 0).toString();
			// Count might not be sent if not given.
			if(request.count){
				serverQuery.count = request.count.toString();
			}
		}
		if(!this.doClientSorting && request.sort){
			var sortInfo = [];
			dojo.forEach(request.sort, function(sort){
				if(sort && sort.attribute){
					sortInfo.push((sort.descending ? "-" : "") + sort.attribute);
				}
			});
			serverQuery.sort = sortInfo.join(',');
		}
		// Compare the last query and the current query by simply json-encoding them,
		// so we dont have to do any deep object compare ... is there some dojo.areObjectsEqual()???
		if(this.doClientPaging && this._lastServerQuery !== null &&
			dojo.toJson(serverQuery) == dojo.toJson(this._lastServerQuery)
			){
			this._numRows = (this._numRows === -1) ? this._items.length : this._numRows;
			fetchHandler(this._items, request, this._numRows);
		}else{
			var xhrFunc =  dojo.xhrPost;
			dojo.safeMixin(serverQuery, this.bttParams);
			var xhrHandler = xhrFunc({url:this.url, handleAs:"text", postData:dojo.toJson(serverQuery), failOk: true});
			request.abort = function(){
				xhrHandler.cancel();
			};
			xhrHandler.addCallback(dojo.hitch(this, function(responseText){
				try {
					data = dojo.fromJson(responseText || null);
					this._xhrFetchHandler(data, request, fetchHandler, errorHandler);
				} catch (err) {
					//err.responseText = responseText;
					//errorHandler(err, request);
					console.error(err);
				}
				
			}));
			xhrHandler.addErrback(function(error){
				errorHandler(error, request);
			});
			// Generate the hash using the time in milliseconds and a randon number.
			// Since Math.randon() returns something like: 0.23453463, we just remove the "0."
			// probably just for esthetic reasons :-).
			this.lastRequestHash = new Date().getTime()+"-"+String(Math.random()).substring(2);
			this._lastServerQuery = dojo.mixin({}, serverQuery);
		}
	}
	
});

}

if(!dojo._hasResource["dojox.grid.enhanced.plugins.AutoScroll"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.grid.enhanced.plugins.AutoScroll"] = true;
dojo.provide("dojox.grid.enhanced.plugins.AutoScroll");




dojo.declare("dojox.grid.enhanced.plugins.AutoScroll", dojox.grid.enhanced._Plugin, {
	// summary:
	//		Provides horizontal and vertical auto-scroll for grid.
	
	// name: String
	//		Plugin name
	name: "autoScroll",
	
	// autoScrollInterval: Integer
	//		The time interval (in miliseconds) between 2 scrolling.
	autoScrollInterval: 1000,
	
	// autoScrollMargin: Integer
	//		The width (in pixel) of the margin area where autoscroll can be triggered.
	autoScrollMargin: 30,
	
	constructor: function(grid, args){
		this.grid = grid;
		this.readyForAutoScroll = false;
		this._scrolling = false;
		args = dojo.isObject(args) ? args : {};
		if("interval" in args){
			this.autoScrollInterval = args.interval;
		}
		if("margin" in args){
			this.autoScrollMargin = args.margin;
		}
		this._initEvents();
		this._mixinGrid();
	},
	_initEvents: function(){
		var g = this.grid;
		this.connect(g, "onCellMouseDown", function(){
			this.readyForAutoScroll = true;
		});
		this.connect(g, "onHeaderCellMouseDown", function(){
			this.readyForAutoScroll = true;
		});
		this.connect(g, "onRowSelectorMouseDown", function(){
			this.readyForAutoScroll = true;
		});
		this.connect(dojo.doc, "onmouseup", function(evt){
			this._manageAutoScroll(true);
			this.readyForAutoScroll = false;
		});
		this.connect(dojo.doc, "onmousemove", function(evt){
			if(this.readyForAutoScroll){
				this._event = evt;
				var gridPos = dojo.position(g.domNode),
					hh = g._getHeaderHeight(),
					margin = this.autoScrollMargin,
					ey = evt.clientY, ex = evt.clientX,
					gy = gridPos.y, gx = gridPos.x,
					gh = gridPos.h, gw = gridPos.w;
				if(ex >= gx && ex <= gx + gw){
					if(ey >= gy + hh && ey < gy + hh + margin){
						this._manageAutoScroll(false, true, false);
						return;
					}else if(ey > gy + gh - margin && ey <= gy + gh){
						this._manageAutoScroll(false, true, true);
						return;
					}else if(ey >= gy && ey <= gy + gh){
						var withinSomeview = dojo.some(g.views.views, function(view, i){
							if(view instanceof dojox.grid._RowSelector){
								return false;
							}
							var viewPos = dojo.position(view.domNode);
							if(ex < viewPos.x + margin && ex >= viewPos.x){
								this._manageAutoScroll(false, false, false, view);
								return true;
							}else if(ex > viewPos.x + viewPos.w - margin && ex < viewPos.x + viewPos.w){
								this._manageAutoScroll(false, false, true, view);
								return true;
							}
							return false;
						}, this);
						if(withinSomeview){
							return;
						}
					}
				}
				//stop autoscroll.
				this._manageAutoScroll(true);
			}
		});
	},
	_mixinGrid: function(){
		var g = this.grid;
		g.onStartAutoScroll = function(/*isVertical, isForward*/){};
		g.onEndAutoScroll = function(/*isVertical, isForward, view, scrollToRowIndex, event*/){};
	},
	_fireEvent: function(eventName, args){
		var g = this.grid;
		switch(eventName){
			case "start":
				g.onStartAutoScroll.apply(g, args);
				break;
			case "end":
				g.onEndAutoScroll.apply(g, args);
				break;
		}
	},
	_manageAutoScroll: function(toStop, isVertical, isForward, view){
		if(toStop){
			this._scrolling = false;
			clearInterval(this._handler);
		}else if(!this._scrolling){
			this._scrolling = true;
			this._fireEvent("start", [isVertical, isForward, view]);
			this._autoScroll(isVertical, isForward, view);
			this._handler = setInterval(dojo.hitch(this, "_autoScroll", isVertical, isForward, view), this.autoScrollInterval);
		}
	},
	_autoScroll: function(isVertical, isForward, view){
		var g = this.grid,
			target = null;
		if(isVertical){
			var targetRow = g.scroller.firstVisibleRow + (isForward ? 1 : -1);
			if(targetRow >= 0 && targetRow < g.rowCount){
				g.scrollToRow(targetRow);
				target = targetRow;
			}
		}else{
			target = this._scrollColumn(isForward, view);
		}
		if(target !== null){
			this._fireEvent("end", [isVertical, isForward, view, target, this._event]);
		}
	},
	_scrollColumn: function(isForward, view){
		var node = view.scrollboxNode,
			target = null;
		if(node.clientWidth < node.scrollWidth){
			var cells = dojo.filter(this.grid.layout.cells, function(cell){
				return !cell.hidden;
			});
			var viewPos = dojo.position(view.domNode);
			var limit, edge, headerPos, i;
			if(isForward){
				limit = node.clientWidth;
				for(i = 0; i < cells.length; ++i){
					headerPos = dojo.position(cells[i].getHeaderNode());
					edge = headerPos.x - viewPos.x + headerPos.w;
					if(edge > limit){
						target = cells[i].index;
						node.scrollLeft += edge - limit + 10;
						break;
					}
				}
			}else{
				limit = 0;
				for(i = cells.length - 1; i >= 0; --i){
					headerPos = dojo.position(cells[i].getHeaderNode());
					edge = headerPos.x - viewPos.x;
					if(edge < limit){
						target = cells[i].index;
						node.scrollLeft += edge - limit - 10;
						break;
					}
				}
			}
		}
		return target;
	}
});
dojox.grid.EnhancedGrid.registerPlugin(dojox.grid.enhanced.plugins.AutoScroll/*name:'autoScroll'*/);

}

if(!dojo._hasResource["dojox.grid.enhanced.plugins.Selector"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.grid.enhanced.plugins.Selector"] = true;
dojo.provide("dojox.grid.enhanced.plugins.Selector");





(function(){
/*=====
dojo.declare("__SelectItem", null,{
	// summary:
	//		An abstract representation of an item.
});
dojo.declare("__SelectCellItem", __SelectItem,{
	// summary:
	//		An abstract representation of a cell.
	
	// row: Integer
	//		Row index of this cell
	row: 0,
	
	// col: Integer
	//		Column index of this cell
	col: 0
});
dojo.declare("__SelectRowItem", __SelectItem,{
	// summary:
	//		An abstract representation of a row.
	
	// row: Integer
	//		Row index of this row
	row: 0,
	
	// except: Integer[]
	//		An array of column indexes of all the unselected cells in this row.
	except: []
});
dojo.declare("__SelectColItem", __SelectItem,{
	// summary:
	//		An abstract representation of a column.
	
	// col: Integer
	//		Column index of this column
	col: 0,
	
	// except: Integer[]
	//		An array of row indexes of all the unselected cells in this column.
	except: []
});
=====*/

var DISABLED = 0, SINGLE = 1, MULTI = 2,
	_theOther = { col: "row", row: "col" },
	_inRange = function(type, value, start, end, halfClose){
		if(type !== "cell"){
			value = value[type];
			start = start[type];
			end = end[type];
			if(typeof value !== "number" || typeof start !== "number" || typeof end !== "number"){
				return false;
			}
			return halfClose ? ((value >= start && value < end) || (value > end && value <= start))
							: ((value >= start && value <= end) || (value >= end && value <= start));
		}else{
			return _inRange("col", value, start, end, halfClose) && _inRange("row", value, start, end, halfClose);
		}
	},
	_isEqual = function(type, v1, v2){
		try{
			if(v1 && v2){
				switch(type){
					case "col": case "row":
						return v1[type] == v2[type] && typeof v1[type] == "number" &&
								!(_theOther[type] in v1) && !(_theOther[type] in v2);
					case "cell":
						return v1.col == v2.col && v1.row == v2.row && typeof v1.col == "number" && typeof v1.row == "number";
				}
			}
		}catch(e){}
		return false;
	},
	_stopEvent = function(evt){
		try{
			if(evt && evt.preventDefault){
				dojo.stopEvent(evt);
			}
		}catch(e){}
	},
	_createItem = function(type, rowIndex, colIndex){
		switch(type){
			case "col":
				return {
					"col": typeof colIndex == "undefined" ? rowIndex : colIndex,
					"except": []
				};
			case "row":
				return {
					"row": rowIndex,
					"except": []
				};
			case "cell":
				return {
					"row": rowIndex,
					"col": colIndex
				};
		}
		return null;
	};
dojo.declare("dojox.grid.enhanced.plugins.Selector", dojox.grid.enhanced._Plugin, {
	// summary:
	//		Provides standard extended selection for grid.
	//		Supports mouse/keyboard selection, multi-selection, and de-selection.
	//		Acceptable plugin parameters:
	//			The whole plugin parameter object is a config object passed to the setupConfig function.
	//
	//		Acceptable cell parameters defined in layout:
	//		1. notselectable: boolean
	//			Whether this column is (and all the cells in it are) selectable.
	
	// name: String
	//		plugin name
	name: "selector",
/*
	//	_config: null,
	//	_enabled: true,
	//	_selecting: {
	//		row: false,
	//		col: false,
	//		cell: false
	//	},
	//	_selected: {
	//		row: [],
	//		col: [],
	//		cell: []
	//	},
	//	_startPoint: {},
	//	_currentPoint: {},
	//	_lastAnchorPoint: {},
	//	_lastEndPoint: {},
	//	_lastSelectedAnchorPoint: {},
	//	_lastSelectedEndPoint: {},
	//	_keyboardSelect: {
	//		row: 0,
	//		col: 0,
	//		cell: 0
	//	},
	//	_curType: null,
	//	_lastType: null,
	//	_usingKeyboard: false,
	//	_toSelect: true,
*/

	constructor: function(grid, args){
		this.grid = grid;
		this._config = {
			row: MULTI,
			col: MULTI,
			cell: MULTI
		};
		this.setupConfig(args);
		if(grid.selectionMode === "single"){
			this._config.row = SINGLE;
		}
		this._enabled = true;
		this._selecting = {};
		this._selected = {
			"col": [],
			"row": [],
			"cell": []
		};
		this._startPoint = {};
		this._currentPoint = {};
		this._lastAnchorPoint = {};
		this._lastEndPoint = {};
		this._lastSelectedAnchorPoint = {};
		this._lastSelectedEndPoint = {};
		this._keyboardSelect = {};
		this._lastType = null;
		this._selectedRowModified = {};
		this._hacks();
		this._initEvents();
		this._initAreas();
		this._mixinGrid();
	},
	destroy: function(){
		this.inherited(arguments);
	},
	//------------public--------------------
	setupConfig: function(config){
		// summary:
		//		Set selection mode for row/col/cell.
		// config: Object
		//		An object with the following structure (all properties are optional):
		//		{
		//			//Default is "multi", all other values are same as "multi".
		//			row: false|"disabled"|"single",
		//			col: false|"disabled"|"single",
		//			cell: false|"disabled"|"single"
		//		}
		if(!config || !dojo.isObject(config)){
			return;
		}
		var types = ["row", "col", "cell"];
		for(var type in config){
			if(dojo.indexOf(types, type) >= 0){
				if(!config[type] || config[type] == "disabled"){
					this._config[type] = DISABLED;
				}else if(config[type] == "single"){
					this._config[type] = SINGLE;
				}else{
					this._config[type] = MULTI;
				}
			}
		}
		
		//Have to set mode to default grid selection.
		var mode = ["none","single","extended"][this._config.row];
		this.grid.selection.setMode(mode);
	},
	isSelected: function(type, rowIndex, colIndex){
		// summary:
		//		Check whether a location (a cell, a column or a row) is selected.
		// tag:
		//		public
		// type: String
		//		"row" or "col" or "cell"
		// rowIndex: Integer
		//		If type is "row" or "cell", this is the row index.
		//		If type if "col", this is the column index.
		// colIndex: Integer?
		//		Only valid when type is "cell"
		// return: Boolean
		//		true if selected, false if not. If cell is covered by a selected column, it's selected.
		return this._isSelected(type, _createItem(type, rowIndex, colIndex));
	},
	toggleSelect: function(type, rowIndex, colIndex){
		this._startSelect(type, _createItem(type, rowIndex, colIndex), this._config[type] === MULTI, false);
		this._endSelect(type);
	},
	select: function(type, rowIndex, colIndex){
		// summary:
		//		Select a location (a cell, a column or a row).
		// tag:
		//		public
		// type: String
		//		"row" or "col" or "cell"
		// rowIndex: Integer
		//		If type is "row" or "cell", this is the row index.
		//		If type if "col", this is the column index.
		// colIndex: Integer?
		//		Only valid when type is "cell"
		if(!this.isSelected(type, rowIndex, colIndex)){
			this.toggleSelect(type, rowIndex, colIndex);
		}
	},
	deselect: function(type, rowIndex, colIndex){
		if(this.isSelected(type, rowIndex, colIndex)){
			this.toggleSelect(type, rowIndex, colIndex);
		}
	},
	selectRange: function(type, start, end, toSelect){
		// summary:
		//		Select a continuous range (a block of cells, a set of continuous columns or rows)
		// tag:
		//		public
		// type: String
		//		"row" or "col" or "cell"
		// start: Integer | Object
		//		If type is "row" or "col", this is the index of the starting row or column.
		//		If type if "cell", this is the left-top cell of the range.
		// end: Integer | Object
		//		If type is "row" or "col", this is the index of the ending row or column.
		//		If type if "cell", this is the right-bottom cell of the range.
		this.grid._selectingRange = true;
		var startPoint = type == "cell" ? _createItem(type, start.row, start.col) : _createItem(type, start),
			endPoint = type == "cell" ? _createItem(type, end.row, end.col) : _createItem(type, end);
		this._startSelect(type, startPoint, false, false, false, toSelect);
		this._highlight(type, endPoint, toSelect === undefined ? true : toSelect);
		this._endSelect(type);
		this.grid._selectingRange = false;
	},
	clear: function(type){
		// summary:
		//		Clear all selections.
		// tag:
		//		public
		// type: String?
		//		"row" or "col" or "cell". If omitted, clear all.
		this._clearSelection(type || "all");
	},
	isSelecting: function(type){
		// summary:
		//		Check whether the user is currently selecting something.
		// tag:
		//		public
		// type: String
		//		"row" or "col" or "cell"
		// return: Boolean
		//		true if is selection, false otherwise.
		if(typeof type == "undefined"){
			return this._selecting.col || this._selecting.row || this._selecting.cell;
		}
		return this._selecting[type];
	},
	selectEnabled: function(toEnable){
		// summary:
		//		Turn on/off this selection functionality if *toEnable* is provided.
		//		Check whether this selection functionality is enabled if nothing is passed in.
		// tag:
		//		public
		// toEnable: Boolean?
		//		To enable or not. Optional.
		// return: Boolean | undefined
		//		Enabled or not.
		if(typeof toEnable != "undefined" && !this.isSelecting()){
			this._enabled = !!toEnable;
		}
		return this._enabled;
	},
	getSelected: function(type, includeExceptions){
		// summary:
		//		Get an array of selected locations.
		// tag:
		//		public
		// type: String
		//		"row" or "col" or "cell"
		// includeExceptions: Boolean
		//		Only meaningful for rows/columns. If true, all selected rows/cols, even they are partly selected, are all returned.
		// return: __SelectItem[]
		switch(type){
			case "cell":
				return dojo.map(this._selected[type], function(item){ return item; });
			case "col": case "row":
				return dojo.map(includeExceptions ? this._selected[type]
				: dojo.filter(this._selected[type], function(item){
					return item.except.length === 0;
				}), function(item){
					return includeExceptions ? item : item[type];
				});
		}
		return [];
	},
	getSelectedCount: function(type, includeExceptions){
		// summary:
		//		Get the number of selected items.
		// tag:
		//		public
		// type: String
		//		"row" or "col" or "cell"
		// includeExceptions: Boolean
		//		Only meaningful for rows/columns. If true, all selected rows/cols, even they are partly selected, are all returned.
		// return: Integer
		//		The number of selected items.
		switch(type){
			case "cell":
				return this._selected[type].length;
			case "col": case "row":
				return (includeExceptions ? this._selected[type]
				: dojo.filter(this._selected[type], function(item){
					return item.except.length === 0;
				})).length;
		}
		return 0;
	},
	getSelectedType: function(){
		// summary:
		//		Get the type of selected items.
		// tag:
		//		public
		// return: String
		//		"row" or "col" or "cell", or any mix of these (separator is | ).
		var s = this._selected;
		return ["",		"cell",		"row",		"row|cell",
				"col",	"col|cell",	"col|row",	"col|row|cell"
			][(!!s.cell.length) | (!!s.row.length << 1) | (!!s.col.length << 2)];
	},
	getLastSelectedRange: function(type){
		// summary:
		//		Get last selected range of the given type.
		// tag:
		//		public
		// return: Object
		//		{start: __SelectItem, end: __SelectItem}
		//		return null if nothing is selected.
		return this._lastAnchorPoint[type] ? {
			"start": this._lastAnchorPoint[type],
			"end": this._lastEndPoint[type]
		} : null;
	},
	
	//--------------------------private----------------------------
	_hacks: function(){
		// summary:
		//		Complete the event system of grid, hack some grid functions to prevent default behavior.
		var g = this.grid;
		var doContentMouseUp = function(e){
			if(e.cellNode){
				g.onMouseUp(e);
			}
			g.onMouseUpRow(e);
		};
		var mouseUp = dojo.hitch(g, "onMouseUp");
		var mouseDown = dojo.hitch(g, "onMouseDown");
		var doRowSelectorFocus = function(e){
			e.cellNode.style.border = "solid 1px";
		};
		dojo.forEach(g.views.views, function(view){
			view.content.domouseup = doContentMouseUp;
			view.header.domouseup = mouseUp;
			if(view.declaredClass == "dojox.grid._RowSelector"){
				view.domousedown = mouseDown;
				view.domouseup = mouseUp;
				view.dofocus = doRowSelectorFocus;
			}
		});
		//Disable default selection.
		g.selection.clickSelect = function(){};
		
		this._oldDeselectAll = g.selection.deselectAll;
		var _this = this;
		g.selection.selectRange = function(from, to){
			_this.selectRange("row", from, to, true);
			if(g.selection.preserver){
				g.selection.preserver._updateMapping(true, true, false, from, to);
			}
			g.selection.onChanged();
		};
		g.selection.deselectRange = function(from, to){
			_this.selectRange("row", from, to, false);
			if(g.selection.preserver){
				g.selection.preserver._updateMapping(true, false, false, from, to);
			}
			g.selection.onChanged();
		};
		g.selection.deselectAll = function(){
			g._selectingRange = true;
			_this._oldDeselectAll.apply(g.selection, arguments);
			_this._clearSelection("row");
			g._selectingRange = false;
			if(g.selection.preserver){
				g.selection.preserver._updateMapping(true, false, true);
			}
			g.selection.onChanged();
		};
		
		var rowSelector = g.views.views[0];
		//The default function re-write the whole className, so can not insert any other classes.
		if(rowSelector instanceof dojox.grid._RowSelector){
			rowSelector.doStyleRowNode = function(inRowIndex, inRowNode){
				dojo.removeClass(inRowNode, "dojoxGridRow");
				dojo.addClass(inRowNode, "dojoxGridRowbar");
				dojo.addClass(inRowNode, "dojoxGridNonNormalizedCell");
				dojo.toggleClass(inRowNode, "dojoxGridRowbarOver", g.rows.isOver(inRowIndex));
				dojo.toggleClass(inRowNode, "dojoxGridRowbarSelected", !!g.selection.isSelected(inRowIndex));
			};
		}
		this.connect(g, "updateRow", function(rowIndex){
			dojo.forEach(g.layout.cells, function(cell){
				if(this.isSelected("cell", rowIndex, cell.index)){
					this._highlightNode(cell.getNode(rowIndex), true);
				}
			}, this);
		});
	},
	_mixinGrid: function(){
		// summary:
		//		Expose events to grid.
		var g = this.grid;
		g.setupSelectorConfig = dojo.hitch(this, this.setupConfig);
		g.onStartSelect = function(){};
		g.onEndSelect = function(){};
		g.onStartDeselect = function(){};
		g.onEndDeselect = function(){};
		g.onSelectCleared = function(){};
	},
	_initEvents: function(){
		// summary:
		//		Connect events, create event handlers.
		var g = this.grid,
			_this = this,
			dp = dojo.partial,
			starter = function(type, e){
				if(type === "row"){
					_this._isUsingRowSelector = true;
				}
				//only left mouse button can select.
				if(_this.selectEnabled() && _this._config[type] && e.button != 2){
					if(_this._keyboardSelect.col || _this._keyboardSelect.row || _this._keyboardSelect.cell){
						_this._endSelect("all");
						_this._keyboardSelect.col = _this._keyboardSelect.row = _this._keyboardSelect.cell = 0;
					}
					if(_this._usingKeyboard){
						_this._usingKeyboard = false;
					}
					var target = _createItem(type, e.rowIndex, e.cell && e.cell.index);
					_this._startSelect(type, target, e.ctrlKey, e.shiftKey);
				}
			},
			ender = dojo.hitch(this, "_endSelect");
		this.connect(g, "onHeaderCellMouseDown", dp(starter, "col"));
		this.connect(g, "onHeaderCellMouseUp", dp(ender, "col"));
		
		this.connect(g, "onRowSelectorMouseDown", dp(starter, "row"));
		this.connect(g, "onRowSelectorMouseUp", dp(ender, "row"));
		
		this.connect(g, "onCellMouseDown", function(e){
			if(e.cell && e.cell.isRowSelector){ return; }
			if(g.singleClickEdit){
				_this._singleClickEdit = true;
				g.singleClickEdit = false;
			}
			starter(_this._config["cell"] == DISABLED ? "row" : "cell", e);
		});
		this.connect(g, "onCellMouseUp", function(e){
			if(_this._singleClickEdit){
				delete _this._singleClickEdit;
				g.singleClickEdit = true;
			}
			ender("all", e);
		});
		
		this.connect(g, "onCellMouseOver", function(e){
			if(_this._curType != "row" && _this._selecting[_this._curType] && _this._config[_this._curType] == MULTI){
				_this._highlight("col", _createItem("col", e.cell.index), _this._toSelect);
				if(!_this._keyboardSelect.cell){
					_this._highlight("cell", _createItem("cell", e.rowIndex, e.cell.index), _this._toSelect);
				}
			}
		});
		this.connect(g, "onHeaderCellMouseOver", function(e){
			if(_this._selecting.col && _this._config.col == MULTI){
				_this._highlight("col", _createItem("col", e.cell.index), _this._toSelect);
			}
		});
		this.connect(g, "onRowMouseOver", function(e){
			if(_this._selecting.row && _this._config.row == MULTI){
				_this._highlight("row", _createItem("row", e.rowIndex), _this._toSelect);
			}
		});
		
		//When row order has changed in a unpredictable way (sorted or filtered), map the new rowindex.
		this.connect(g, "onSelectedById", "_onSelectedById");
		
		//When the grid refreshes, all those selected should still appear selected.
		this.connect(g, "_onFetchComplete", function(){
			//console.debug("refresh after buildPage:", g._notRefreshSelection);
			if(!g._notRefreshSelection){
				this._refreshSelected(true);
			}
		});

		//Small scroll might not refresh the grid.
		this.connect(g.scroller, "buildPage", function(){
			//console.debug("refresh after buildPage:", g._notRefreshSelection);
			if(!g._notRefreshSelection){
				this._refreshSelected(true);
			}
		});
		
		//Whenever the mouse is up, end selecting.
		this.connect(dojo.doc, "onmouseup", dp(ender, "all"));
		
		//If autoscroll is enabled, connect to it.
		this.connect(g, "onEndAutoScroll", function(isVertical, isForward, view, target){
			var selectCell = _this._selecting.cell,
				type, current, dir = isForward ? 1 : -1;
			if(isVertical && (selectCell || _this._selecting.row)){
				type = selectCell ? "cell" : "row";
				current = _this._currentPoint[type];
				_this._highlight(type, _createItem(type, current.row + dir, current.col), _this._toSelect);
			}else if(!isVertical && (selectCell || _this._selecting.col)){
				type = selectCell ? "cell" : "col";
				current = _this._currentPoint[type];
				_this._highlight(type, _createItem(type, current.row, target), _this._toSelect);
			}
		});
		//If the grid is changed, selection should be consistent.
		this.subscribe("dojox/grid/rearrange/move/" + g.id, "_onInternalRearrange");
		this.subscribe("dojox/grid/rearrange/copy/" + g.id, "_onInternalRearrange");
		this.subscribe("dojox/grid/rearrange/change/" + g.id, "_onExternalChange");
		this.subscribe("dojox/grid/rearrange/insert/" + g.id, "_onExternalChange");
		this.subscribe("dojox/grid/rearrange/remove/" + g.id, "clear");
		
		//have to also select when the grid's default select is used.
		this.connect(g, "onSelected", function(rowIndex){
			if(this._selectedRowModified && this._isUsingRowSelector){
				delete this._selectedRowModified;
			}else if(!this.grid._selectingRange){
				this.select("row", rowIndex);
			}
		});
		this.connect(g, "onDeselected", function(rowIndex){
			if(this._selectedRowModified && this._isUsingRowSelector){
				delete this._selectedRowModified;
			}else if(!this.grid._selectingRange){
				this.deselect("row", rowIndex);
			}
		});
	},
	_onSelectedById: function(id, newIndex, isSelected){
		if(this.grid._noInternalMapping){
			return;
		}
		var pointSet = [this._lastAnchorPoint.row, this._lastEndPoint.row,
			this._lastSelectedAnchorPoint.row, this._lastSelectedEndPoint.row];
		pointSet = pointSet.concat(this._selected.row);
		var found = false;
		dojo.forEach(pointSet, function(item){
			if(item){
				if(item.id === id){
					found = true;
					item.row = newIndex;
				}else if(item.row === newIndex && item.id){
					item.row = -1;
				}
			}
		});
		if(!found && isSelected){
			dojo.some(this._selected.row, function(item){
				if(item && !item.id && !item.except.length){
					item.id = id;
					item.row = newIndex;
					return true;
				}
				return false;
			});
		}
		found = false;
		pointSet = [this._lastAnchorPoint.cell, this._lastEndPoint.cell,
			this._lastSelectedAnchorPoint.cell, this._lastSelectedEndPoint.cell];
		pointSet = pointSet.concat(this._selected.cell);
		dojo.forEach(pointSet, function(item){
			if(item){
				if(item.id === id){
					found = true;
					item.row = newIndex;
				}else if(item.row === newIndex && item.id){
					item.row = -1;
				}
			}
		});
	},
	onSetStore: function(){
		this._clearSelection("all");
	},
	_onInternalRearrange: function(type, mapping){
		try{
		//The column can not refresh it self!
		this._refresh("col", false);
		
		dojo.forEach(this._selected.row, function(item){
			dojo.forEach(this.grid.layout.cells, function(cell){
				this._highlightNode(cell.getNode(item.row), false);
			}, this);
		}, this);
		//The rowbar must be cleaned manually
		dojo.query(".dojoxGridRowSelectorSelected").forEach(function(node){
			dojo.removeClass(node, "dojoxGridRowSelectorSelected");
			dojo.removeClass(node, "dojoxGridRowSelectorSelectedUp");
			dojo.removeClass(node, "dojoxGridRowSelectorSelectedDown");
		});
		
		var cleanUp = function(item){
			if(item){
				delete item.converted;
			}
		},
		pointSet = [this._lastAnchorPoint[type], this._lastEndPoint[type],
			this._lastSelectedAnchorPoint[type], this._lastSelectedEndPoint[type]];
		
		if(type === "cell"){
			this.selectRange("cell", mapping.to.min, mapping.to.max);
			var cells = this.grid.layout.cells;
			dojo.forEach(pointSet, function(item){
				if(item.converted){ return; }
				for(var r = mapping.from.min.row, tr = mapping.to.min.row; r <= mapping.from.max.row; ++r, ++tr){
					for(var c = mapping.from.min.col, tc = mapping.to.min.col; c <= mapping.from.max.col; ++c, ++tc){
						while(cells[c].hidden){ ++c; }
						while(cells[tc].hidden){ ++tc; }
						if(item.row == r && item.col == c){
							//console.log('mapping found: (', item.row, ",",item.col,") to (", tr, ",", tc,")");
							item.row = tr;
							item.col = tc;
							item.converted = true;
							return;
						}
					}
				}
			});
		}else{
			pointSet = this._selected.cell.concat(this._selected[type]).concat(pointSet).concat(
				[this._lastAnchorPoint.cell, this._lastEndPoint.cell,
				this._lastSelectedAnchorPoint.cell, this._lastSelectedEndPoint.cell]);
			dojo.forEach(pointSet, function(item){
				if(item && !item.converted){
					var from = item[type];
					if(from in mapping){
						item[type] = mapping[from];
					}
					item.converted = true;
				}
			});
			dojo.forEach(this._selected[_theOther[type]], function(item){
				for(var i = 0, len = item.except.length; i < len; ++i){
					var from = item.except[i];
					if(from in mapping){
						item.except[i] = mapping[from];
					}
				}
			});
		}
		
		dojo.forEach(pointSet, cleanUp);
		
		this._refreshSelected(true);
		this._focusPoint(type, this._lastEndPoint);
		}catch(e){
			console.warn("Selector._onInternalRearrange() error",e);
		}
	},
	_onExternalChange: function(type, target){
		var start = type == "cell" ? target.min : target[0],
			end = type == "cell" ? target.max : target[target.length - 1];
		this.selectRange(type, start, end);
	},
	_refresh: function(type, toHighlight){
		if(!this._keyboardSelect[type]){
			dojo.forEach(this._selected[type], function(item){
				this._highlightSingle(type, toHighlight, item, undefined, true);
			}, this);
		}
	},
	_refreshSelected: function(){
		this._refresh("col", true);
		this._refresh("row", true);
		this._refresh("cell", true);
	},
	_initAreas: function(){
		var g = this.grid, f = g.focus, _this = this, dk = dojo.keys,
			keyboardSelectReady = 1, duringKeyboardSelect = 2,
			onmove = function(type, createNewEnd, rowStep, colStep, evt){
				//Keyboard swipe selection is SHIFT + Direction Keys.
				var ks = _this._keyboardSelect;
				//Tricky, rely on valid status not being 0.
				if(evt.shiftKey && ks[type]){
					if(ks[type] === keyboardSelectReady){
						if(type === "cell"){
							var item = _this._lastEndPoint[type];
							if(f.cell != g.layout.cells[item.col + colStep] || f.rowIndex != item.row + rowStep){
								ks[type] = 0;
								return;
							}
						}
						//If selecting is not started, start it
						_this._startSelect(type, _this._lastAnchorPoint[type], true, false, true);
						_this._highlight(type, _this._lastEndPoint[type], _this._toSelect);
						ks[type] = duringKeyboardSelect;
					}
					//Highlight to the new end point.
					var newEnd = createNewEnd(type, rowStep, colStep, evt);
					if(_this._isValid(type, newEnd, g)){
						_this._highlight(type, newEnd, _this._toSelect);
					}
					_stopEvent(evt);
				}
			},
			onkeydown = function(type, getTarget, evt, isBubble){
				if(isBubble && _this.selectEnabled() && _this._config[type] != DISABLED){
					switch(evt.keyCode){
						case dk.SPACE:
							//Keyboard single point selection is SPACE.
							_this._startSelect(type, getTarget(), evt.ctrlKey, evt.shiftKey);
							_this._endSelect(type);
							break;
						case dk.SHIFT:
							//Keyboard swipe selection starts with SHIFT.
							if(_this._config[type] == MULTI && _this._isValid(type, _this._lastAnchorPoint[type], g)){
								//End last selection if any.
								_this._endSelect(type);
								_this._keyboardSelect[type] = keyboardSelectReady;
								_this._usingKeyboard = true;
							}
					}
				}
			},
			onkeyup = function(type, evt, isBubble){
				if(isBubble && evt.keyCode == dojo.keys.SHIFT && _this._keyboardSelect[type]){
					_this._endSelect(type);
					_this._keyboardSelect[type] = 0;
				}
			};
		//TODO: this area "rowHeader" should be put outside, same level as header/content.
		if(g.views.views[0] instanceof dojox.grid._RowSelector){
			this._lastFocusedRowBarIdx = 0;
			f.addArea({
				name:"rowHeader",
				onFocus: function(evt, step){
					var view = g.views.views[0];
					if(view instanceof dojox.grid._RowSelector){
						var rowBarNode = view.getCellNode(_this._lastFocusedRowBarIdx, 0);
						if(rowBarNode){
							dojo.toggleClass(rowBarNode, f.focusClass, false);
						}
						//evt might not be real event, it may be a mock object instead.
						if(evt && "rowIndex" in evt){
							if(evt.rowIndex >= 0){
								_this._lastFocusedRowBarIdx = evt.rowIndex;
							}else if(!_this._lastFocusedRowBarIdx){
								_this._lastFocusedRowBarIdx = 0;
							}
						}
						rowBarNode = view.getCellNode(_this._lastFocusedRowBarIdx, 0);
						if(rowBarNode){
							dijit.focus(rowBarNode);
							dojo.toggleClass(rowBarNode, f.focusClass, true);
						}
						f.rowIndex = _this._lastFocusedRowBarIdx;
						_stopEvent(evt);
						return true;
					}
					return false;
				},
				onBlur: function(evt, step){
					var view = g.views.views[0];
					if(view instanceof dojox.grid._RowSelector){
						var rowBarNode = view.getCellNode(_this._lastFocusedRowBarIdx, 0);
						dojo.toggleClass(rowBarNode, f.focusClass, false);
						_stopEvent(evt);
					}
					return true;
				},
				onMove: function(rowStep, colStep, evt){
					var view = g.views.views[0];
					if(rowStep && view instanceof dojox.grid._RowSelector){
						var next = _this._lastFocusedRowBarIdx + rowStep;
						if(next >= 0 && next < g.rowCount){
							//TODO: these logic require a better Scroller.
							_stopEvent(evt);
							var rowBarNode = view.getCellNode(_this._lastFocusedRowBarIdx, 0);
							dojo.toggleClass(rowBarNode, f.focusClass, false);
							//If the row is not fetched, fetch it.
							var sc = g.scroller;
							var lastPageRow = sc.getLastPageRow(sc.page);
							var rc = g.rowCount - 1, row = Math.min(rc, next);
							if(next > lastPageRow){
								g.setScrollTop(g.scrollTop + sc.findScrollTop(row) - sc.findScrollTop(_this._lastFocusedRowBarIdx));
							}
							//Now we have fetched the row.
							rowBarNode = view.getCellNode(next, 0);
							dijit.focus(rowBarNode);
							dojo.toggleClass(rowBarNode, f.focusClass, true);
							_this._lastFocusedRowBarIdx = next;
							//If the row is out of view, scroll to it.
							f.cell = rowBarNode;
							f.cell.view = view;
							f.cell.getNode = function(index){
								return f.cell;
							};
							f.rowIndex = _this._lastFocusedRowBarIdx;
							f.scrollIntoView();
							f.cell = null;
						}
					}
				}
			});
			f.placeArea("rowHeader","before","content");
		}
		//Support keyboard selection.
		f.addArea({
			name:"cellselect",
			onMove: dojo.partial(onmove, "cell", function(type, rowStep, colStep, evt){
				var current = _this._currentPoint[type];
				return _createItem("cell", current.row + rowStep, current.col + colStep);
			}),
			onKeyDown: dojo.partial(onkeydown, "cell", function(){
				return _createItem("cell", f.rowIndex, f.cell.index);
			}),
			onKeyUp: dojo.partial(onkeyup, "cell")
		});
		f.placeArea("cellselect","below","content");
		f.addArea({
			name:"colselect",
			onMove: dojo.partial(onmove, "col", function(type, rowStep, colStep, evt){
				var current = _this._currentPoint[type];
				return _createItem("col", current.col + colStep);
			}),
			onKeyDown: dojo.partial(onkeydown, "col", function(){
				return _createItem("col", f.getHeaderIndex());
			}),
			onKeyUp: dojo.partial(onkeyup, "col")
		});
		f.placeArea("colselect","below","header");
		f.addArea({
			name:"rowselect",
			onMove: dojo.partial(onmove, "row", function(type, rowStep, colStep, evt){
				return _createItem("row", f.rowIndex);
			}),
			onKeyDown: dojo.partial(onkeydown, "row", function(){
				return _createItem("row", f.rowIndex);
			}),
			onKeyUp: dojo.partial(onkeyup, "row")
		});
		f.placeArea("rowselect","below","rowHeader");
	},
	_clearSelection: function(type, reservedItem){
		// summary:
		//		Clear selection for given type and fire events, but retain the highlight for *reservedItem*,
		//		thus avoid "flashing".
		// tag:
		//		private
		// type: String
		//		"row", "col", or "cell
		// reservedItem: __SelectItem
		//		The item to retain highlight.
		if(type == "all"){
			this._clearSelection("cell", reservedItem);
			this._clearSelection("col", reservedItem);
			this._clearSelection("row", reservedItem);
			return;
		}
		this._isUsingRowSelector = true;
		dojo.forEach(this._selected[type], function(item){
			if(!_isEqual(type, reservedItem, item)){
				this._highlightSingle(type, false, item);
			}
		}, this);
		this._blurPoint(type, this._currentPoint);
		this._selecting[type] = false;
		this._startPoint[type] = this._currentPoint[type] = null;
		this._selected[type] = [];
		
		//Have to also deselect default grid selection.
		if(type == "row" && !this.grid._selectingRange){
			this._oldDeselectAll.call(this.grid.selection);
			this.grid.selection._selectedById = {};
		}
		
		//Fire events.
		this.grid.onEndDeselect(type, null, null, this._selected);
		this.grid.onSelectCleared(type);
	},
	_startSelect: function(type, start, extending, isRange, mandatarySelect, toSelect){
		// summary:
		//		Start selection, setup start point and current point, fire events.
		// tag:
		//		private
		// type: String
		//		"row", "col", or "cell"
		// extending: Boolean
		//		Whether this is a multi selection
		// isRange: Boolean
		//		Whether this is a range selection (i.e. select from the last end point to this point)
		// start: __SelectItem
		//		The start point
		// mandatarySelect: Boolean
		//		If true, toSelect will be same as the original selection status.
		if(!this._isValid(type, start)){
			return;
		}
		var lastIsSelected = this._isSelected(type, this._lastEndPoint[type]),
			isSelected = this._isSelected(type, start);
		
		//If we are modifying the selection using keyboard, retain the old status.
		this._toSelect = mandatarySelect ? isSelected : !isSelected;
		
		//If CTRL is not pressed or it's SINGLE mode, this is a brand new selection.
		if(!extending || (!isSelected && this._config[type] == SINGLE)){
			this._clearSelection("all", start);
			this._toSelect = toSelect === undefined ? true : toSelect;
		}
		
		this._selecting[type] = true;
		this._currentPoint[type] = null;
		
		//We're holding SHIFT while clicking, it's a Click-Range selection.
		if(isRange && this._lastType == type && lastIsSelected == this._toSelect){
			if(type === "row"){
				this._isUsingRowSelector = true;
			}
			this._startPoint[type] = this._lastEndPoint[type];
			this._highlight(type, this._startPoint[type]);
			this._isUsingRowSelector = false;
		}else{
			this._startPoint[type] = start;
		}
		//Now start selection
		this._curType = type;
		this._fireEvent("start", type);
		this._isStartFocus = true;
		this._isUsingRowSelector = true;
		this._highlight(type, start, this._toSelect);
		this._isStartFocus = false;
	},
	_endSelect: function(type){
		// summary:
		//		End selection. Keep records, fire events and cleanup status.
		// tag:
		//		private
		// type: String
		//		"row", "col", or "cell"
		if(type === "row"){
			delete this._isUsingRowSelector;
		}
		if(type == "all"){
			this._endSelect("col");
			this._endSelect("row");
			this._endSelect("cell");
		}else if(this._selecting[type]){
			this._addToSelected(type);
			this._lastAnchorPoint[type] = this._startPoint[type];
			this._lastEndPoint[type] = this._currentPoint[type];
			if(this._toSelect){
				this._lastSelectedAnchorPoint[type] = this._lastAnchorPoint[type];
				this._lastSelectedEndPoint[type] = this._lastEndPoint[type];
			}
			this._startPoint[type] = this._currentPoint[type] = null;
			this._selecting[type] = false;
			this._lastType = type;
			this._fireEvent("end", type);
		}
	},
	_fireEvent: function(evtName, type){
		switch(evtName){
			case "start":
				this.grid[this._toSelect ? "onStartSelect" : "onStartDeselect"](type, this._startPoint[type], this._selected);
				break;
			case "end":
				this.grid[this._toSelect ? "onEndSelect" : "onEndDeselect"](type, this._lastAnchorPoint[type], this._lastEndPoint[type], this._selected);
				break;
		}
	},
	_calcToHighlight: function(type, target, toHighlight, toSelect){
		// summary:
		//		Calculate what status should *target* have.
		//		If *toSelect* is not provided, this is a no op.
		// This function is time-critical!!
		if(toSelect !== undefined){
			var sltd;
			if(this._usingKeyboard && !toHighlight){
				var last = this._isInLastRange(this._lastType, target);
				if(last){
					sltd = this._isSelected(type, target);
					//This 2 cases makes the keyboard swipe selection valid!
					if(toSelect && sltd){
						return false;
					}
					if(!toSelect && !sltd && this._isInLastRange(this._lastType, target, true)){
						return true;
					}
				}
			}
			return toHighlight ? toSelect : (sltd || this._isSelected(type, target));
		}
		return toHighlight;
	},
	_highlightNode: function(node, toHighlight){
		// summary:
		//		Do the actual highlight work.
		if(node){
			var selectCSSClass = "dojoxGridRowSelected";
			var selectCellClass = "dojoxGridCellSelected";
			dojo.toggleClass(node, selectCSSClass, toHighlight);
			dojo.toggleClass(node, selectCellClass, toHighlight);
		}
	},
	_highlightHeader: function(colIdx, toHighlight){
		var cells = this.grid.layout.cells;
		var node = cells[colIdx].getHeaderNode();
		var selectedClass = "dojoxGridHeaderSelected";
		dojo.toggleClass(node, selectedClass, toHighlight);
	},
	_highlightRowSelector: function(rowIdx, toHighlight){
		//var t1 = (new Date()).getTime();
		var rowSelector = this.grid.views.views[0];
		if(rowSelector instanceof dojox.grid._RowSelector){
			var node = rowSelector.getRowNode(rowIdx);
			if(node){
				var selectedClass = "dojoxGridRowSelectorSelected";
				dojo.toggleClass(node, selectedClass, toHighlight);
			}
		}
		//console.log((new Date()).getTime() - t1);
	},
	_highlightSingle: function(type, toHighlight, target, toSelect, isRefresh){
		// summary:
		//		Highlight a single item.
		// This function is time critical!!
		var _this = this, toHL, g = _this.grid, cells = g.layout.cells;
		switch(type){
			case "cell":
				toHL = this._calcToHighlight(type, target, toHighlight, toSelect);
				var c = cells[target.col];
				if(!c.hidden && !c.notselectable){
					this._highlightNode(target.node || c.getNode(target.row), toHL);
				}
				break;
			case "col":
				toHL = this._calcToHighlight(type, target, toHighlight, toSelect);
				this._highlightHeader(target.col, toHL);
				dojo.query("td[idx='" + target.col + "']", g.domNode).forEach(function(cellNode){
					var rowNode = cells[target.col].view.content.findRowTarget(cellNode);
					if(rowNode){
						var rowIndex = rowNode[dojox.grid.util.rowIndexTag];
						_this._highlightSingle("cell", toHL, {
							"row": rowIndex,
							"col": target.col,
							"node": cellNode
						});
					}
				});
				break;
			case "row":
				toHL = this._calcToHighlight(type, target, toHighlight, toSelect);
				this._highlightRowSelector(target.row, toHL);
				dojo.forEach(cells, function(cell){
					_this._highlightSingle("cell", toHL, {
						"row": target.row,
						"col": cell.index,
						"node": cell.getNode(target.row)
					});
				});
				//To avoid dead lock
				this._selectedRowModified = true;
				if(!isRefresh){
					g.selection.setSelected(target.row, toHL);
				}
		}
	},
	_highlight: function(type, target, toSelect){
		// summary:
		//		Highlight from start point to target.
		// toSelect: Boolean
		//		Whether we are selecting or deselecting.
		// This function is time critical!!
		if(this._selecting[type] && target !== null){
			var start = this._startPoint[type],
				current = this._currentPoint[type],
				_this = this,
				highlight = function(from, to, toHL){
					_this._forEach(type, from, to, function(item){
						_this._highlightSingle(type, toHL, item, toSelect);
					}, true);
				};
			switch(type){
				case "col": case "row":
					if(current !== null){
						if(_inRange(type, target, start, current, true)){
							//target is between start and current, some selected should be deselected.
							highlight(current, target, false);
						}else{
							if(_inRange(type, start, target, current, true)){
								//selection has jumped to different direction, all should be deselected.
								highlight(current, start, false);
								current = start;
							}
							highlight(target, current, true);
						}
					}else{
						//First time select.
						this._highlightSingle(type, true, target, toSelect);
					}
					break;
				case "cell":
					if(current !== null){
						if(_inRange("row", target, start, current, true) ||
							_inRange("col", target, start, current, true) ||
							_inRange("row", start, target, current, true) ||
							_inRange("col", start, target, current, true)){
							highlight(start, current, false);
						}
					}
					highlight(start, target, true);
			}
			this._currentPoint[type] = target;
			this._focusPoint(type, this._currentPoint);
		}
	},
	_focusPoint: function(type, point){
		// summary:
		//		Focus the current point, so when you move mouse, the focus indicator follows you.
		if(!this._isStartFocus){
			var current = point[type],
				f = this.grid.focus;
			if(type == "col"){
				f._colHeadFocusIdx = current.col;
				f.focusArea("header");
			}else if(type == "row"){
				f.focusArea("rowHeader", {
					"rowIndex": current.row
				});
			}else if(type == "cell"){
				f.setFocusIndex(current.row, current.col);
			}
		}
	},
	_blurPoint: function(type, point){
		// summary:
		//		Blur the current point.
		var f = this.grid.focus;
		if(type == "col"){
			f._blurHeader();
		}else if(type == "cell"){
			f._blurContent();
		}
	},
	_addToSelected: function(type){
		// summary:
		//		Record the selected items.
		var toSelect = this._toSelect, _this = this,
			toAdd = [], toRemove = [],
			start = this._startPoint[type],
			end = this._currentPoint[type];
		if(this._usingKeyboard){
			//If using keyboard, selection will be ended after every move. But we have to remember the original selection status,
			//so as to return to correct status when we shrink the selection region.
			this._forEach(type, this._lastAnchorPoint[type], this._lastEndPoint[type], function(item){
				//If the original selected item is not in current range, change its status.
				if(!_inRange(type, item, start, end)){
					(toSelect ? toRemove : toAdd).push(item);
				}
			});
		}
		this._forEach(type, start, end, function(item){
			var isSelected = _this._isSelected(type, item);
			if(toSelect && !isSelected){
				//Add new selected items
				toAdd.push(item);
			}else if(!toSelect){
				//Remove deselected items.
				toRemove.push(item);
			}
		});
		this._add(type, toAdd);
		this._remove(type, toRemove);
		
		// have to keep record in original grid selection
		dojo.forEach(this._selected.row, function(item){
			if(item.except.length > 0){
				//to avoid dead lock
				this._selectedRowModified = true;
				this.grid.selection.setSelected(item.row, false);
			}
		}, this);
	},
	_forEach: function(type, start, end, func, halfClose){
		// summary:
		//		Go through items from *start* point to *end* point.
		// This function is time critical!!
		if(!this._isValid(type, start, true) || !this._isValid(type, end, true)){
			return;
		}
		switch(type){
			case "col": case "row":
				start = start[type];
				end = end[type];
				var dir = end > start ? 1 : -1;
				if(!halfClose){
					end += dir;
				}
				for(; start != end; start += dir){
					func(_createItem(type, start));
				}
				break;
			case "cell":
				var colDir = end.col > start.col ? 1 : -1,
					rowDir = end.row > start.row ? 1 : -1;
				for(var i = start.row, p = end.row + rowDir; i != p; i += rowDir){
					for(var j = start.col, q = end.col + colDir; j != q; j += colDir){
						func(_createItem(type, i, j));
					}
				}
		}
	},
	_makeupForExceptions: function(type, newCellItems){
		// summary:
		//		When new cells is selected, maybe they will fill in the "holes" in selected rows and columns.
		var makedUps = [];
		dojo.forEach(this._selected[type], function(v1){
			dojo.forEach(newCellItems, function(v2){
				if(v1[type] == v2[type]){
					var pos = dojo.indexOf(v1.except, v2[_theOther[type]]);
					if(pos >= 0){
						v1.except.splice(pos, 1);
					}
					makedUps.push(v2);
				}
			});
		});
		return makedUps;
	},
	_makeupForCells: function(type, newItems){
		// summary:
		//		When some rows/cols are selected, maybe they can cover some of the selected cells,
		//		and fill some of the "holes" in the selected cols/rows.
		var toRemove = [];
		dojo.forEach(this._selected.cell, function(v1){
			dojo.some(newItems, function(v2){
				if(v1[type] == v2[type]){
					toRemove.push(v1);
					return true;
				}
				return false;
			});
		});
		this._remove("cell", toRemove);
		dojo.forEach(this._selected[_theOther[type]], function(v1){
			dojo.forEach(newItems, function(v2){
				var pos = dojo.indexOf(v1.except, v2[type]);
				if(pos >= 0){
					v1.except.splice(pos, 1);
				}
			});
		});
	},
	_addException: function(type, items){
		// summary:
		//		If some rows/cols are deselected, maybe they have created "holes" in selected cols/rows.
		dojo.forEach(this._selected[type], function(v1){
			dojo.forEach(items, function(v2){
				v1.except.push(v2[_theOther[type]]);
			});
		});
	},
	_addCellException: function(type, items){
		// summary:
		//		If some cells are deselected, maybe they have created "holes" in selected rows/cols.
		dojo.forEach(this._selected[type], function(v1){
			dojo.forEach(items, function(v2){
				if(v1[type] == v2[type]){
					v1.except.push(v2[_theOther[type]]);
				}
			});
		});
	},
	_add: function(type, items){
		// summary:
		//		Add to the selection record.
		var cells = this.grid.layout.cells;
		if(type == "cell"){
			var colMakedup = this._makeupForExceptions("col", items);
			var rowMakedup = this._makeupForExceptions("row", items);
			//Step over hidden columns.
			items = dojo.filter(items, function(item){
				return dojo.indexOf(colMakedup, item) < 0 && dojo.indexOf(rowMakedup, item) < 0 &&
					!cells[item.col].hidden && !cells[item.col].notselectable;
			});
		}else{
			if(type == "col"){
				//Step over hidden columns.
				items = dojo.filter(items, function(item){
					return !cells[item.col].hidden && !cells[item.col].notselectable;
				});
			}
			this._makeupForCells(type, items);
			this._selected[type] = dojo.filter(this._selected[type], function(v){
				return dojo.every(items, function(item){
					return v[type] !== item[type];
				});
			});
		}
		if(type != "col" && this.grid._hasIdentity){
			dojo.forEach(items, function(item){
				var record = this.grid._by_idx[item.row];
				if(record){
					item.id = record.idty;
				}
			}, this);
		}
		this._selected[type] = this._selected[type].concat(items);
	},
	_remove: function(type, items){
		// summary:
		//		Remove from the selection record.
		var comp = dojo.partial(_isEqual, type);
		this._selected[type] = dojo.filter(this._selected[type], function(v1){
			return !dojo.some(items, function(v2){
				return comp(v1, v2);
			});
		});
		if(type == "cell"){
			this._addCellException("col", items);
			this._addCellException("row", items);
		}else{
			this._addException(_theOther[type], items);
		}
	},
	_isCellNotInExcept: function(type, item){
		// summary:
		//		Return true only when a cell is covered by selected row/col, and its not a "hole".
		var attr = item[type], corres = item[_theOther[type]];
		return dojo.some(this._selected[type], function(v){
			return v[type] == attr && dojo.indexOf(v.except, corres) < 0;
		});
	},
	_isSelected: function(type, item){
		// summary:
		//		Return true when the item is selected. (or logically selected, i.e, covered by a row/col).
		if(!item){ return false; }
		var res = dojo.some(this._selected[type], function(v){
			var ret = _isEqual(type, item, v);
			if(ret && type !== "cell"){
				return v.except.length === 0;
			}
			return ret;
		});
		if(!res && type === "cell"){
			res = (this._isCellNotInExcept("col", item) || this._isCellNotInExcept("row", item));
			if(type === "cell"){
				res = res && !this.grid.layout.cells[item.col].notselectable;
			}
		}
		return res;
	},
	_isInLastRange: function(type, item, isSelected){
		// summary:
		//		Return true only when the item is in the last seletion/deseletion range.
		var start = this[isSelected ? "_lastSelectedAnchorPoint" : "_lastAnchorPoint"][type],
			end = this[isSelected ? "_lastSelectedEndPoint" : "_lastEndPoint"][type];
		if(!item || !start || !end){ return false; }
		return _inRange(type, item, start, end);
	},
	_isValid: function(type, item, allowNotSelectable){
		// summary:
		//		Check whether the item is a valid __SelectItem for the given type.
		if(!item){ return false; }
		try{
			var g = this.grid, index = item[type];
			switch(type){
				case "col":
					return index >= 0 && index < g.layout.cells.length && dojo.isArray(item.except) &&
							(allowNotSelectable || !g.layout.cells[index].notselectable);
				case "row":
					return index >= 0 && index < g.rowCount && dojo.isArray(item.except);
				case "cell":
					return item.col >= 0 && item.col < g.layout.cells.length &&
							item.row >= 0 && item.row < g.rowCount &&
							(allowNotSelectable || !g.layout.cells[item.col].notselectable);
			}
		}catch(e){}
		return false;
	}
});
dojox.grid.EnhancedGrid.registerPlugin(dojox.grid.enhanced.plugins.Selector/*name:'selector'*/, {
	"dependency": ["autoScroll"]
});
})();

}

if(!dojo._hasResource["com.ibm.btt.dijit.Grid"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.Grid"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure 
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit.Grid"); 


 









/**
 * BTT extended GRID, it supports 
 * 1. Data submit in a form
 * 2. Bind table data to a BTT context variable
 * 3. Edit table data and submit back to BTT Server
 * 4. BTT widget common property support like visibility etc.
 */
dojo.declare("com.ibm.btt.dijit.Grid",[ dojox.grid.EnhancedGrid,
						com.ibm.btt.dijit.AbstractWidgetMixin ],{
	
	storeDataName : "",
	
	templateString: dojo.cache("com.ibm.btt.dijit", "templates/Grid.html", "<div hidefocus=\"hidefocus\" role=\"grid\" dojoAttachEvent=\"onmouseout:_mouseOut\">\r\n\t\r\n\t<div class=\"dojoxGridMasterHeader\" dojoAttachPoint=\"viewsHeaderNode\" role=\"presentation\"></div>\r\n\t<div class=\"dojoxGridErroressages\" style=\"display: none;\" dojoAttachPoint=\"errorMessageNode\"></div>\r\n\t<div class=\"dojoxGridMasterView\" dojoAttachPoint=\"viewsNode\" role=\"presentation\"></div>\r\n\t<div class=\"dojoxGridMasterMessages\" style=\"display: none;\" dojoAttachPoint=\"messagesNode\"></div>\r\n\t<span dojoAttachPoint=\"lastFocusNode\" tabindex=\"0\"></span>\r\n\t\r\n</div>\r\n"),
	
	name : "",
	
	width:"",
	
	storeData : "",
	
	comparatorMap : "",
	
	height : "300",
	
	//editable : false,
	
	sortEnabled: false,
	
	/**
	 * 
	 * flag to identify whether this grid is loaded for the first time
	 * 
	 * @tag private this is a internal property, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_firstTimeLoaded:true, 
	
	SELECTION_VALID_STATE: true,
	
	selectionMode : "none",
	
	selectionRequired : false,
	
	selectable : false,
	
	/**
	 * 
	 * internal nls bundle
	 * 
	 * @tag private this is a internal property, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_bundle : new com.ibm.btt.util.I18nBundle("com.ibm.btt.dijit", "Grid"),
	
	/**
	 * readOnly, default value is false
	 */
	readOnly: false, 
	
	/**
	 * disable, default value is false
	 */
	disabled: false,
		
	create : function(){
	
		this._eventHandlers = [];
		this.inherited(arguments);
		
	},
	
	postCreate : function() {
	
		this.inherited(arguments);
			
		if(this.selectable){
			console.debug("grid", this);
			this._eventHandlers.push(dojo.connect(this, "postrender", this, function(){
				//this.checkSelectionNum();
				if(this.pagination){
					this._eventHandlers.push(dojo.connect(this.pagination.plugin, "gotoPage", this, function(){
						console.debug("the selection before", this.selection);
						this.selection.deselectAll();
						console.debug("the selection after", this.selection);
					}));			
				}
			}));
			this._eventHandlers.push(dojo.connect(this, "onSelectionChanged", this, this.checkSelectionNum));
		}
		if(this.sortEnabled){
			this._eventHandlers.push(dojo.connect(this, "onHeaderCellClick", this, function(e){
				if(dojo.hasClass(e.target, 'dojoxGridSortBtnSingle') || dojo.hasClass(e.target, 'dojoxGridSortBtnNested')){
					console.debug("the selection before", this.selection);
					this.selection.deselectAll();
					console.debug("the selection after", this.selection);
				}
			}));
		}
		
		this._eventHandlers.push(dojo.connect(this, "_onFetchComplete", this, function(){
			this.checkSelectionNum();
		}));
		
		//Fix defect 25178
		this._eventHandlers.push(dojo.connect(this, "onKeyDown", this, function(e){
			this._set("state", this._getState());
		}));
		
		//Fix defect 25203
		if (this.selectionMode === "single") {
			this._eventHandlers.push(dojo.connect(this.selection, "addToSelection", this, function(inIndex) {
				if (this._lastSelectedIndex === inIndex) {
					this.selection.deselectAll();
					this._lastSelectedIndex = undefined;
				} else {
					this._lastSelectedIndex = inIndex;
				}
			}));
		}
		
		this.errorMessageIcon = dojo.create("div", {"class":"errorMessageIcon", "style":"display:none;"}, this.viewsHeaderNode, "last");
		
		//Add listener to listen cell widget click event 
		//and then to notify cell widget itself was clicked
		this._eventHandlers.push(dojo.connect(this, "onCellClick", this, this._onCellWidgetClick));
		//PMR31194
		//check each cell to see if there is a defined in the cell widget.
		//if there is one, add it into the store comparatorMap
		this._setComparatorForColunm();
	},
	
	/**
	 * 
	 * hook method to notify celle widget this cell is clicked when this cell is not in edit mode
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_onCellWidgetClick : function(e){
		if(e.cell._onClick){
			e.cell._onClick(e);
		}
	},
	
	/**
	 * 
	 * Compute what this.state should be based on state of children
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_getState: function(){	
		var widgets = [];
		var cells = this.layout.cells;
		for (var i = 0; i < cells.length; i ++ ) {
			
			if(cells[i].editable && cells[i].widget) {
				//this.editable = true;
				widgets.push(cells[i].widget);
			}
		}
		var states = dojo.map(widgets, function(w){
			return w.get("state") || "";
		});

		return dojo.indexOf(states, "Error") >= 0 || !this.SELECTION_VALID_STATE ? "Error" :
			dojo.indexOf(states, "Incomplete") >= 0 ? "Incomplete" : "";
	},
		
	postMixInProperties : function() {
		this.inherited(arguments);
		var scope = this;
		(function(obj) {
			if(dojo.isArray(obj)) {
				for(var i = 0; i < obj.length; i++) {
					arguments.callee(obj[i]);
				}
			} else if (dojo.isObject(obj)) {
				if(obj.name) {
					obj.name = scope.getI18NString(obj.name);
				} else if(obj.cells) {
					arguments.callee(obj.cells);
				}
			} 
		})(this.structure);
	},
	
	setStoreData: function(newRows /* array of objects */) {
		this.setStore(new dojo.data.ItemFileWriteStore({data: {items: newRows }}));
	},
	
	/**
	 * 
	 * hook method for storeData attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setStoreDataAttr : function(value){
		if(!this.store){
			this.store = new dojo.data.ItemFileWriteStore({data: {items: dojo.fromJson(value) }});
		}
	},
	
	/**
	 * 
	 * hook method for comparatorMap attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setComparatorForColunm : function(){
		
		var comparatorMap
		if(this.comparatorMap != ""){
			comparatorMap = dojo.fromJson(this.comparatorMap);
		} else {
			comparatorMap = {};
		}
		for ( var i = 0; i < this.structure[0].length; i++) {
			if(this.structure[0][i].type){
				var cell = this.getCellByField(this.structure[0][i].field);
				if(cell.comparator){
					comparatorMap[this.structure[0][i].field] = dojo.hitch(cell, cell.comparator);
				}
			}
		}	
		this.store.comparatorMap = comparatorMap;
			
	},
	
	getEditableStroeData: function() {
		if(this.storeDataName) {
			var cells = this.layout.cells;
			var store = this.store;	
			var selectable = this.selectable;
			var editableStoreData = [];
			this.store.fetch({
				onComplete: function(items, request){
					for(var m = 0; m < items.length; m ++) {
						var tempObj = {};
						var flag = false;
						for (var i = 0; i < cells.length; i ++ ) {
							if(cells[i].editable) {
								var name = cells[i].field;
								var value = store.getValue(items[m] , cells[i].field);
								if (value && value !== "" && typeof value != "string") {
						    		if(cells[i].editable && cells[i].widget && cells[i].widget.serialize) {
						    			value = cells[i].widget.serialize(value, cells[i].widget.constraints);
						    		} 
						    	}							
								tempObj[name] = (value === null || value === "null" ? "" : value);
								flag = true;
							}
						}
						if(flag){
							editableStoreData.push(tempObj);
						}
					}
			}});
			if(editableStoreData.length>0){
				return editableStoreData;
			}else{
				return;
			}
		} else return;
	},
	
	onFormSubmit : function() {
		// Do NOT submit any data if this grid is disabled
		if(this.disabled){
			return;
		}
		if(this.edit && this.edit.apply){
			this.edit.apply();
		}
		if(this.storeDataName) {
			var cells = this.layout.cells;
			var store = this.store;
			var preName = this.storeDataName;
			var node = this.domNode;
			var selectable = this.selectable;
			dojo.query("> input[type=hidden]", node).forEach(function(node, index, array){ 
			    dojo.destroy(node);
			 }); 
			
			if ( ! (this.store instanceof dojox.data.QueryReadStore) ){
				
				this.store.fetch({
					onComplete: function(items, request){
						for(var m = 0; m < items.length; m ++) {
							for (var i = 0; i < cells.length; i ++ ) {
								if(store.getValue(items[m] , cells[i].field) != null) {
									break;
								}
							}
							if(i == cells.length) continue;
							for (var i = 0; i < cells.length; i ++ ) {
								if(cells[i].editable) {
									var tempObj = {};
									tempObj.type = 'hidden';
									tempObj.name = preName + "." + m + "." + cells[i].field;
									tempObj.value = store.getValue(items[m] , cells[i].field);
									if (tempObj.value && tempObj.value !== "" && typeof tempObj.value != "string") {
							    		if(cells[i].editable && cells[i].widget && cells[i].widget.serialize) {
							    			tempObj.value = cells[i].widget.serialize(tempObj.value, cells[i].widget.constraints);
							    		} 
							    	}
									tempObj.value = tempObj.value === null? "" : tempObj.value;
									dojo.create("input", tempObj, node, "last");
								}
							}
						}
				}});
			}
			
			if(this.name && this.selectable) {
				var cells = this.layout.cells;
				var name = this.name;
				var store = this.store;
				var node = this.domNode;
				var selections = this.selection.getSelected();
				for (var m = 0; m < selections.length; m ++ ) {
					var isSingleSelect = this.selectionMode == "single";
					if(isSingleSelect && m == 1) break;
					var selection = selections[m];
					dojo.forEach(store.getAttributes(selection), function(attribute) {
						var tempObj = {};
						tempObj.type = 'hidden';
						if(isSingleSelect) {
							tempObj.name = name + "." + attribute;
						} else {
							tempObj.name = name + "." + m + "." + attribute;
						}
						tempObj.value = store.getValue(selection, attribute);
						for(var i = 0; i < cells.length; i ++ ) {
					       if(cells[i].field == attribute) {
					    	   if (tempObj.value && tempObj.value !== "" && typeof tempObj.value != "string") {
					    		   if(cells[i].editable && cells[i].widget && cells[i].widget.serialize) {
					    			   tempObj.value = cells[i].widget.serialize(tempObj.value, cells[i].widget.constraints);
					    		   } 
					    	   }
					    	   tempObj.value = tempObj.value === null? "" : tempObj.value;
					    	   dojo.create("input", tempObj, node, "last");
					    	   break;
					       } 
					    }
					    console.debug("tempObj", tempObj);
				    }); 
					
				 } 
			}
		}
		
	},
	
	/**
	 * 
	 * hook method for value attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_getValueAttr : function(value) {
		if(this.selectable) {
			//enable multi-selection
			var selections = this.selection.getSelected();
			var cells = this.layout.cells;
			var store = this.store; 
			var tempObjects = [];
			if(selections.length > 0){
				for (var m = 0; m < selections.length; m ++ ) {
					var selection = selections[m];
					var tempObj = {};
					dojo.forEach(store.getAttributes(selection), function(attribute) {
						for (var i = 0; i < cells.length; i ++ ) {
							if(cells[i].field == attribute) {
								tempObj[attribute] = store.getValue(selection, attribute);
								if (tempObj[attribute] && tempObj[attribute] !== "" && typeof tempObj[attribute] != "string") {
									if(cells[i].editable && cells[i].widget && (cells[i].widget instanceof com.ibm.btt.dijit.DateTextBox || cells[i].widget instanceof com.ibm.btt.dijit.NumberTextBox) && cells[i].formatter) {
										tempObj[attribute] = cells[i].widget.serialize(tempObj[attribute], cells[i].widget.constraints);
									 } 
								}
						    	tempObj[attribute] = tempObj[attribute] === null? "" : tempObj[attribute];
								break;
							}
						}
				    });
					console.debug("tempObj", tempObj);
					if(this.selectionMode == "single") {
						return tempObj;
					}
					if(tempObj && tempObj !== ""){
						tempObjects.push(tempObj);
					}
				}
				return tempObjects;
			} else {
				return null;
			}
		} else if(this._cellEventRowData){
			return this._cellEventRowData;
		}else {
			return undefined;
		}
	},
	
	/**
	 * 
	 * hook method for Visibility attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setVisibilityAttr : function(value){
		this.visibility = value;
		if (value == "gone") {
			
			var rows = this.get("rowCount");
	 		for ( var i = 0; i < rows; i++) {
				this.doCancelEdit(i);
			}
			
			if(this._firstTimeLoaded){
				this._eventHandlers.push(dojo.connect(this,"startup",dojo.hitch(this,function(){
					dojo.style(this.domNode, "visibility", "visible");
					dojo.style(this.domNode, "display", "none");
				})));	
			}else{
					dojo.style(this.domNode, "visibility", "visible");
					dojo.style(this.domNode, "display", "none");
			}
			
		} else if (value == "hidden") {
			
			var rows = this.get("rowCount");
	 		for ( var i = 0; i < rows; i++) {
				this.doCancelEdit(i);
			}
			
			dojo.style(this.domNode, "display", "");
			dojo.style(this.domNode, "visibility", "hidden");
			
		} else {
			dojo.style(this.domNode, "display", "");
			dojo.style(this.domNode, "visibility", "visible");
			this.update();
		}
		
		this._firstTimeLoaded = false;
	},
	
	/* Deprecated in BTT7.1 release, please use getValueInFirstSelectedItem instead. */
	getValueInSelectedItem : function(attName) {
		return this.getValueInFirstSelectedItem(attName);
	},
	
	getValueInFirstSelectedItem : function(attName) {
		var firstSelectedItem = this.selection.getFirstSelected();
		if(firstSelectedItem) {
			return this.store.getValue(firstSelectedItem, attName);
		} else {
			return null;
		}
	},
	
	getLengthOfSelectedRows: function(){
		return this.selection.getSelected().length;
	},
	
	getSelectedItem : function(){
		return this.attr("value");
	},
	
	/**
	 * 
	 * hook method for width attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setWidthAttr : function(value) {
		if (value != "") {
			this.width = this.handleLenUint(value);
			dojo.style(this.domNode, "width", this.width);
		}	
	},
	
	/**
	 * 
	 * hook method for height attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setHeightAttr : function(value) {
		if (value != "") {
			this.height = this.handleLenUint(value);
		}	
	},
		
	canSort:function(){
		
		if(this.sortEnabled  && this.disabled == false){			
			return this.inherited(arguments);
			
		}else{			
			return false;
		}
	},

	/**
	 * This function is reserved because the form require that the monitored widget must have validate function.
	 */
	
	validate:function(inValue, inRowIndex, inAttrName){
	},	
	

	checkSelectionNum: function(){
		this.showErrorIcon("");
		var selectNum = this.selection.getSelected().length;
		var msg = "";
		console.debug("this.selectionRequired", this.selectionRequired);
		console.debug("selectNum", selectNum);
		if(this.selectionRequired && selectNum < 1){
			if(this.selectionMode === "single"){
				msg = this._bundle.getMessage("rangeSingleMessage");
				this.SELECTION_VALID_STATE = false;	
			} else if(this.selectionMode === "extended"){
				msg = this._bundle.getMessage("rangeMultiMessage");
				this.SELECTION_VALID_STATE = false;
			} else {
				this.SELECTION_VALID_STATE = true;
			}
		} else {
			this.SELECTION_VALID_STATE = true;
		}
		this.showErrorIcon(msg);
		this._set("state", this._getState());
		
	},
	
	showErrorIcon: function(message){
		if(message){
			this.errorMessageIcon.title = message;
			this.errorMessageIcon.style.display = "";
			var hint = this.get('hint');
			if (hint != undefined && hint != null && hint != "") {
				this._hint = hint;
				this.set('hint', message);
			} 
		}else{
			this.errorMessageIcon.title = "";
			this.errorMessageIcon.style.display = "none";
			if(this._hint){
				this.set('hint', this._hint);
				delete this._hint;
			}
		}
	},
	
	/**
	 * If not valid, return false; otherwise return true;
	 * return the valid status of this widget
	 */
	isValid:function(){
		var isValid = this._getState() == "";	
		console.debug("isValid", isValid);
		return isValid;
	},
	
	/**
	 * RESET table data , this means the user editted cell values will be lost, the store will be roll back
	 * Currently, only support ItemFileWriteStore 
	 */
	 reset:function(){
	 	//remove the selected rows? if readOnly or disabled?
	 	if( (this.readOnly === true) || (this.disabled === true)){
	 		this.removeSelectedRows();
	 		return;
	 	}
	 	//only necessary to reset table data when user edit the table cell data
	 	if (this.store instanceof dojo.data.ItemFileReadStore){
	 		var rows = this.get("rowCount");
	 		for ( var i = 0; i < rows; i++) {
				this.doCancelEdit(i);
			}
	 		this.store.revert();
	 	}	
	 },
	 
	 /**
		 * 
		 * hook method for readOnly attribute
		 * 
		 * @tag private this is a internal method, may be changed or removed in later version
		 *              please do not use this method in customer code.
		 * */
	 _setReadOnlyAttr:function(value){
	 	console.debug("_setReadOnlyAttr",value);
	 	this.readOnly = value;
	 	//this.goToUneditableState();
	 },
	 
	 /**
		 * 
		 * hook method for disabled attribute
		 * 
		 * @tag private this is a internal method, may be changed or removed in later version
		 *              please do not use this method in customer code.
		 * */
	 _setDisabledAttr:function(value){
	 	console.debug("_setDisabledAttr",value);
	 	this.disabled = value;
	 	
	 	//this.goToUneditableState();
	 	if(this.disabled){
	 		//define a variable to save the current state of table
	 		
	 		//check if the selection is enabled and disable the selection
	 		if(this.selectionMode != "none"){
				if (!this._disableCache) {
	 				this._disableCache = {};
	 			}
	 			this._disableCache.selectionMode = this.selectionMode;
	 			this.selectionMode = "none";
	 			this.selection.setMode(this.selectionMode);			
	 		}
	 		
	 		//check if columnReordering is enabled
	 		if(this.columnReordering){
				if (!this._disableCache) {
	 				this._disableCache = {};
	 			}
	 			this._disableCache.columnReordering = this.columnReordering;
	 			this.columnReordering = false;
	 			//refresh the table otherwise columnReordering will 
	 			//also work for the fist time you reordering the column
	 			
	 			//IE seems have a problem to refresh the table when first loading
	 			//the view is not successfully loaded, there is a temporary
	 			if (this._pending_requests) {
	 				this._refresh(true);
	 			}else{
	 				setTimeout(dojo.hitch(this, function(){ //FIXME need to take more consideration on this case
	 					this._refresh(true);
	 				}),1000);
	 			}
	 			
	 		}
	 		
	 		// Hide scrollbars
	 		console.log("Grid attached events : ", this._attachEvents);
	 		dojo.query('.dojoxGridScrollbox', this.id).forEach(function(node, index, arr){
	 			dojo.style(node, "overflow", "hidden");
	 		});
	 		
	 		// add overlay to prevent events as much as possible
	 		if(!dojo.query(".disabledGrid", this.id).length)
	 	    {
	 	        var mask = dojo.create("div", {"class": "disabledGrid"}, this.domNode);
	 	        
	 	        var stopEvents = function(e){
	 	        	e.preventDefault();
	 	        	e.stopPropagation();
	 	        };
	 	        mask.onclick = stopEvents;
	 	        mask.onDblClick = stopEvents;
	 	        mask.onmouseover = stopEvents;
	 	        mask.onmousemove = stopEvents;
	 	        mask.onmouseout = stopEvents;
	 	        mask.onmouseleave = stopEvents;
	 	        mask.onmouseenter = stopEvents;
	 	        mask.onmouseup = stopEvents;
	 	        mask.onmousedown = stopEvents;
	 	        mask.onfocus = stopEvents;
	 	        mask.onkeydown = stopEvents;
	 	        mask.onkeyup = stopEvents;
	 	        mask.onkeypress = stopEvents;
	 	        mask.onblur = stopEvents;
	 	        mask.onkeypress = stopEvents;
	 	        
	 	        stopEvents = undefined;
	 	    }
	 		
	 		dojo.addClass(this.domNode, "dijitDisabled");
	 	}
	 	else{
	 		
	 		//restore the selectionMode if find in cache
	 		if(this._disableCache && this._disableCache.selectionMode){
	 			this.selectionMode = this._disableCache.selectionMode;
	 			this.selection.setMode(this.selectionMode);	
	 			delete this._disableCache.selectionMode;
	 		}
	 		
	 		//restore columnReordering if find in cache
	 		if(this._disableCache && this._disableCache.columnReordering){
	 			this.columnReordering = this._disableCache.columnReordering;
	 			delete this._disableCache.columnReordering;
	 			//refresh table to make the columnReordering work
	 			this._refresh(true);
	 		}
	 		
	 		// Show scrollbars
	 		dojo.query('.dojoxGridScrollbox', this.id).forEach(function(node, index, arr){
	 			dojo.style(node, "overflow", "auto");
	 		});
	 		
	 		// remove overlay
	 		dojo.query(".disabledGrid", this.id).forEach(function(node){
	 			dojo.destroy(node);
	 		});
	 		
	 		if(this._disableCache){
	 			delete this._disableCache;
	 		}
	 		
	 		dojo.removeClass(this.domNode, "dijitDisabled");
	 		
	 	}
	 	
	 	this.checkSelectionNum();
	 	
	 },
	 
	/**
	 * BTT provided function , supports focus on grid
	 */
	focusOn:function(){
		 if(!this.isFocusable()){
			 console.info("can't focus on grid, because it's not focusable");
			 return;
		 }

		 var isEmpty = (this.rowCount === 0); // If grid is empty this.grid.rowCount == 0
		 if (!isEmpty){
			 var cellIdx = 0;
			 var cell = this.getCell(cellIdx);
			 if (cell.hidden) {
				 // if first cell isn't visible, use _colHeadFocusIdx
				 // could also use a while loop to find first visible cell - not sure that is worth it
				 cellIdx = this.focus.isNavHeader() ? this.focus._colHeadFocusIdx : 0;
			 }
			 this.focus.setFocusIndex(0, cellIdx);
		 } else {
			 this.focus.focusHeader();
		 }
	},
	
	/**
	 * Override the canEdit, to support readOnly and disable property
	 */
	canEdit: function(inCell, inRowIndex){
		console.debug("[this.readOnly,this.disabled]",this.readOnly,this.disabled);
		
		if((this.readOnly === true)||(this.disabled === true)){
			console.debug("can't edit");
			return false;			
		}else{
			var result = this.inherited(arguments);
			console.debug("canEdit:",result);
			return result;
		}
	},
	
	/**
	 * Override the buildViews function to filter the null rows.
	 */	
	buildViews : function() {
		for(var i=0, vs; (vs=this.layout.structure[i]); i++){
			vs.onBeforeRow = function(inRowIndex, rowCells) {
				if(inRowIndex < 0){
					rowCells[0].hidden = false;
					return;
				}
				var item = this.grid.getItem(inRowIndex);
				if(!item){ return; }
				var cells = this.grid.layout.cells;
				for (var i = 0; i < cells.length; i ++ ) {
					if(this.grid.store.getValue(item , cells[i].field) !== null) {
						rowCells[0].hidden = false;
						return;
					}	
				}
				rowCells[0].hidden = true;
			};
		}
		this.inherited(arguments);
	}, 
	
	onFetchError : function(err, req) {
		if(err.responseText) {
			(new dijit.Dialog({
	            title: this._bundle.getMessage("errorDialogTitle"),
	            content : err.responseText
	        })).show();
		}
	},
	
	getWidget : function(arg){
		var cells = this.layout.cells;
		for ( var i = 0; i < cells.length; i++) {
			if (cells[i].id == arg) {
				return cells[i];
			}
		}
		return undefined;
	},
	
	destroy : function(){
		
		dojo.forEach(this._eventHandlers, dojo.disconnect);
		
		this._eventHandlers = undefined;
		
		this.inherited(arguments);
		
		if(this.store && this.store.destroy){
			this.store.destroy();
		}
		
	},
	
	/**
	 * @Tag private, this is to deal with class change when
	 * this grid is disabled.
	 */
	_setClassAttr: function(arg){
		if(this.disabled){
			return;
		}else{
			this.inherited(arguments);
		}
	},
	
	/**
	 * Function used to publish Ajax timeout event when pagination.
	 */	
	onAsyncTimeOut : function() {
		
	},
	
	/**
	 * Function used to publish Ajax successful event when pagination.
	 */
	onAsyncOK : function() {
		
	},

	/**
	 * Function used to pubish Ajax error event when pagination.
	 * 
	 */
	onAsyncError : function() {
		
	}
}); 


}

if(!dojo._hasResource["com.ibm.btt.dijit.Message"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.Message"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit.Message"); 


 
 


dojo.requireLocalization("com.ibm.btt.dijit", "Message", null, "ROOT,zh-cn");




/**
 * The widget for "component manage error and warning messages".
 * 
 * Alpha developer can customize the style of the level of messages by convention. The css file is css/dijit/message.css.
 */
dojo.declare("com.ibm.btt.dijit.Message",[dijit._Widget,dijit._Templated,com.ibm.btt.dijit.AbstractWidgetMixin] ,{ 
	
	templateString : "<div><div dojoAttachPoint='staticHolder'><span dojoAttachPoint='staticMessageHolder' class='dijitLabelBase'></span><span dojoAttachPoint='closeHandler' style='margin:0 0 0 5px;text-decoration:underline;cursor:pointer'></span></div><div dojoAttachPoint='dialogHolder'><span dojoAttachPoint='popupMessageHolder' class='dijitLabelBase'></span></div></div>",	//TODO , 1) add a close icon 2) add a label icon, to make it more beautifil
	
	level : "ERROR",		// get the default level from server-side. It should be generated by tooling base on user's configuration.
	text : "",				// the value of binding of dataName in current BTTContext, it's text.
	styleClass : "",		// style of the level of messages
	name : "",				// binded dataName
	messageArray : "",
	_popupDialog : null,		// popup dijit object
	isNotSubmitted : true,
	displayMode : "STATIC",	//default is static mode display, not popup
	width : "",
	height : "",
	textWrap : false,
	
	attributeMap: dojo.delegate(dijit._Widget.prototype.attributeMap, {
		visibility : {
			node : "domNode"
		},
		value : {
			
		}
	}),
	
	postMixInProperties : function(){
		this.inherited(arguments);
		this.bundle = new com.ibm.btt.util.I18nBundle("com.ibm.btt.dijit", "Message");
	},
	
	postCreate:function(){
		this._init();
		this._showHideCloseHandler(false);
		if(this.text) {
			this.display(this.text, this.level);
		} else if (this.messageArray) {
			try {
				var tempArray = dojo.fromJson(this.messageArray);
				this.displayMessageArray(tempArray);
			} catch (e) {
				
			}
		}
	},
	
	_init:function(){
		this.closeHandler.innerHTML = this.bundle.getMessage("closeMessage");
		this.styleClass = {
			"ERROR":"errorMessage",
			"WARN":"warnMessage",
			"INFO":"infoMessage"
		};
		dojo.connect(this.closeHandler,"onclick",this,"closeMessage");
	},
	
	/**
	 * Display the message at xx level . API for beta developer. text should be NLS aware
	 * 
	 * For dynamic values, the message should be a template like this : TRANSFER_ERROR:Your {account} doesn't can't transfer value exceeds {amount}.
	 * Alpha developer can invoke the API like message1.display("TRANSFER_ERROR","ERROR", accountTextbox1.value, amounTextbox1.value);
	 * 
	 * When the text is NLS key , whose value is template, user need pass in both the level and the value array.
	 * 
	 * @param text the message content 
	 * @param level level including ERROR, WARN , INFO. it's optional
	 */
	display:function(text, level){	//FIXME, the API define. We can't support both display(text, dynamic attributes ) and display(text, level ) etc.
		if ((text  === ""  )||(text === null) || (text === undefined)){	//empty , or null, don't display it at null
			console.info("[display] Need text message for displaying");
			this._showHideCloseHandler(false);
			return; 
		}
			
		var message = this._getMessageValue.apply(this, arguments);		//1. get message value
		this.staticMessageHolder.innerHTML = message;	//display it
		
		if(level === undefined){
			level = this.level; 	//use the default level
		}
		
		this._switchModeAndStyles("STATIC", level);
		this._showHideCloseHandler(true);
	},
	
	displayMessageArray : function(mesArray) {
		if(mesArray.length > 0) {
			var strArray = [];
			for(var i = 0; i < mesArray.length; i ++) {
				strArray.push((i + 1) + " ");
				strArray.push(this._getMessageValue(mesArray[i]));
				if(i != mesArray.length - 1) 
					strArray.push("<br>");
			}
			
			var message = strArray.join("");
			if(this.displayMode === "STATIC") {
				this.display(message);
			} else {
				this.displayPopup(message);
			}

		}
			
	}, 

	/**
	 * 
	 * Flag is true, then show ; else hide closeHanlder node
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_showHideCloseHandler:function(flag){
		if(flag){
			dojo.style(this.closeHandler,{
				"display" : ""
			});
		}else{
			dojo.style(this.closeHandler,{
				"display" : "none"
			});
		}
		
	},
	
	/**
	 * Display the message at xx level in popup way
	 * 
	 * For dynamic values, the message should be a template like this : TRANSFER_ERROR:Your {account} doesn't can't transfer value exceeds {amount}.
	 * Alpha developer can invoke the API like message1.display("TRANSFER_ERROR","ERROR", accountTextbox1.value, amounTextbox1.value);
	 * 
	 * When the text is NLS key , whose value is template, user need pass in both the level and the value array.
	 * 
	 * @text message content
	 * @level level including ERROR, WARN , INFO. level is optional
	 */
	displayPopup:function(text, level){ //FIXME, the API define. We can't support both display(text, dynamic attributes ) and display(text, level ) etc.
	
		if ((text  === ""  )||(text === null) || (text === undefined)){	//empty , or null, don't display it at null
			console.info("[displayPopup] Need text message for displaying")
			return; 
		}
		var message = this._getMessageValue.apply(this,arguments);		//1. get message value
		this.popupMessageHolder.innerHTML = message;	//display it
		if(level === undefined){
			level = this.level; 	//use the default level
		}
		this._switchModeAndStyles("POPUP",level);
		if (this._popupDialog === null) {
			var dialogId = this.id + "messagePopup";
			this._popupDialog = new dijit.Dialog( {
				id : dialogId,
				title : this.bundle.getMessage("popupTitle") // i18n for this.
			}, this.dialogHolder);
		}
		this._popupDialog.show();
		
	},
	
	/**
	 * public method, developer can invoke this api to close the displayed mesage. Either static label or popup messages
	 */
	closeMessage:function(){
		if(this.displayMode === "STATIC"){
			dojo.style(this.staticHolder,{
				"display":"none"
			});
		}else {
			if(this._popupDialog !== null){
				this._popupDialog.hide();
			}else{
				console.error("[Should have a popup dialog]");
			}	
		}
	},
	
	_setTextWrapAttr : function(value){
		this.textWrap = value;
		this._setTextLabelStyle();
	},
	
	/**
	 * 
	 * hook method for width method
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	
	_setWidthAttr : function(value) {
		if (value != "" && value != null) {
			this.width = value;
			dojo.style(this.staticMessageHolder, "width", this.handleLenUint(this.width));
			dojo.style(this.popupMessageHolder, "width", this.handleLenUint(this.width));
		}
	},
	
	/**
	 * 
	 * hook method for height method
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	
	_setHeightAttr : function(value) {
		if (value != "" && value != null) {
			this.height = value;
			dojo.style(this.staticMessageHolder, "height", this.handleLenUint(this.height));
			dojo.style(this.popupMessageHolder, "height", this.handleLenUint(this.height));
		}
	},
	
	/**
	 * 
	 * internal method to set the mode and style for widget
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_switchModeAndStyles : function(mode, level) {
		this.displayMode = mode;
		
		if(this.displayMode === "STATIC"){
			dojo.style(this.staticHolder,{
				"display" : ""
			});
			dojo.style(this.dialogHolder,{
				"display" : "none"
			});
			if(this._popupDialog !== null){
				this._popupDialog.hide();
			}
			dojo.removeClass(this.staticMessageHolder);
			dojo.addClass(this.staticMessageHolder,this.styleClass[level]);	//apply the style class of the level...
		} else {
			dojo.style(this.dialogHolder,{
				"display" : ""
			});
			dojo.style(this.staticHolder,{
				"display" : "none"
			});
			dojo.removeClass(this.popupMessageHolder);
			dojo.addClass(this.popupMessageHolder, this.styleClass[level]);	//apply the style class of the level...
		}
		this._setTextLabelStyle();
	},
	
	_setTextLabelStyle : function(){
		dojo.addClass(this.popupMessageHolder, "dijitLabelBase");
		if (this.textWrap == true) {
			dojo.addClass(this.popupMessageHolder, "dijitLabelWrap");
		} else {
			dojo.removeClass(this.popupMessageHolder, "dijitLabelWrap");
		}
		dojo.addClass(this.staticMessageHolder, "dijitLabelBase");
		if (this.textWrap == true) {
			dojo.addClass(this.staticMessageHolder, "dijitLabelWrap");
		} else {
			dojo.removeClass(this.staticMessageHolder, "dijitLabelWrap");
		}
	},
	
	/**
	 * 
	 * hook method for message attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_getMessageValue:function(text,level){
		//1) get i18n value   2) if it's a template, Message1.display(��ERROR��, ��CROSS_FILED_VALIDATION_ERROR��,��{ xx : cbcrossbank.value, xx:xxx});
		var message = ""; 
		if(arguments.length  === 1 ){	//only one argument, it's text
			message = this.getI18NString(text); 	//geti18n value...	
		}else if(arguments.length === 2){	 // text, level ,
			message = this.getI18NString(text); 	//geti18n value...
		}else if(arguments.length > 2){		//text, level, dynamic attributes...
			var values = [];
			for(var i= 2; i< arguments.length; i++){
				values.push(arguments[i]);
			}
			console.debug("display,dynamic attributes values",values);
			message = this.getI18NString(text,values,true);
		}
		
		return message;
	},

	/**
	 * 
	 * hook method for value attribute
	 * For AJAX response error scenario, it will use the name,value pairs to reset all the widget's values
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setValueAttr:function(value){
		this.text = value;
	},
	
	destroy : function() {
		this.inherited(arguments);
		if(this._popupDialog !== null){
			this._popupDialog.destroyRecursive();		//set free the dijit dialog	
		}
	}
	
});

}

if(!dojo._hasResource["dojox.uuid.generateRandomUuid"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dojox.uuid.generateRandomUuid"] = true;
dojo.provide("dojox.uuid.generateRandomUuid");

dojox.uuid.generateRandomUuid = function(){
	// summary:
	//		This function generates random UUIDs, meaning "version 4" UUIDs.
	// description:
	//		A typical generated value would be something like this:
	//		"3b12f1df-5232-4804-897e-917bf397618a"
	//
	//		For more information about random UUIDs, see sections 4.4 and
	//		4.5 of RFC 4122: http://tools.ietf.org/html/rfc4122#section-4.4
	//
	//		This generator function is designed to be small and fast,
	//		but not necessarily good.
	//
	//		Small: This generator has a small footprint. Once comments are
	//		stripped, it's only about 25 lines of code, and it doesn't
	//		dojo.require() any other modules.
	//
	//		Fast: This generator can generate lots of new UUIDs fairly quickly
	//		(at least, more quickly than the other dojo UUID generators).
	//
	//		Not necessarily good: We use Math.random() as our source
	//		of randomness, which may or may not provide much randomness.
	// examples:
	//		var string = dojox.uuid.generateRandomUuid();
	var HEX_RADIX = 16;

	function _generateRandomEightCharacterHexString(){
		// Make random32bitNumber be a randomly generated floating point number
		// between 0 and (4,294,967,296 - 1), inclusive.
		var random32bitNumber = Math.floor( (Math.random() % 1) * Math.pow(2, 32) );
		var eightCharacterHexString = random32bitNumber.toString(HEX_RADIX);
		while(eightCharacterHexString.length < 8){
			eightCharacterHexString = "0" + eightCharacterHexString;
		}
		return eightCharacterHexString; // for example: "3B12F1DF"
	}

	var hyphen = "-";
	var versionCodeForRandomlyGeneratedUuids = "4"; // 8 == binary2hex("0100")
	var variantCodeForDCEUuids = "8"; // 8 == binary2hex("1000")
	var a = _generateRandomEightCharacterHexString();
	var b = _generateRandomEightCharacterHexString();
	b = b.substring(0, 4) + hyphen + versionCodeForRandomlyGeneratedUuids + b.substring(5, 8);
	var c = _generateRandomEightCharacterHexString();
	c = variantCodeForDCEUuids + c.substring(1, 4) + hyphen + c.substring(4, 8);
	var d = _generateRandomEightCharacterHexString();
	var returnValue = a + hyphen + b + hyphen + c + d;
	returnValue = returnValue.toLowerCase();
	return returnValue; // String
};

}

if(!dojo._hasResource["com.ibm.btt.dijit.FileUpload"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.FileUpload"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit.FileUpload");

 
 

 
 



/**
 * Declare a widget to provide client side AJAX file upload function, contains:
 * 	1. Text Box
 *  2. Browse Button
 *  3. Upload Button
 *  4. Cancel Button
 *  5. Upload Status
 *  6. Error Message
 * 
 * Basic Function:
 * 		User can use Browse Button to select a file from local file system, then click Upload Button to upload it to server side, 
 * 		or click Cancel Button to clear the selection.
 * 		During the upload process, user can click Cancel button to terminate the upload process.
 * 		When file successfully uploaded, user can delete the uploaded file using Cancel Button.
 * 
 * Implement based on dojox.form.FileUpload, extends it to enable Cancel function.
 * 
 */
dojo.declare("com.ibm.btt.dijit.FileUpload",
	[dijit._Widget, dijit._Templated, com.ibm.btt.dijit.AbstractWidgetMixin],{
	
	templateString: dojo.cache("com.ibm.btt.dijit", "templates/FileUpload.html", "<div dojoAttachPoint=\"fileuploader\" class = \"fileupload_pane\">\r\n<!--\r\n/* \r\n *------------------------------------------------------------------- \r\n * Licensed Materials - Property of IBM\r\n * Restricted Materials of IBM\r\n * 5724-H82\r\n * (C) Copyright IBM Corp.2010 All Rights Reserved.\r\n * US Government Users Restricted Rights - Use, duplication or disclosure\r\n * restricted by GSA ADP Schedule Contract with IBM Corp\r\n -------------------------------------------------------------------\r\n */\r\n-->\r\n\t<span dojoAttachPoint=\"inputBox\"></span>\r\n\t<span dojoAttachPoint=\"browseBtn\"></span>\r\n\t<div dojoAttachPoint=\"uploadBtn\"></div>\r\n\t<span dojoAttachPoint=\"statusMessage\" class=\"loadingMsg\"></span>\r\n\t<div dojoAttachPoint=\"clearBtn\"></div>\r\n\t<span dojoAttachPoint=\"errorMessage\" class=\"errorMsg\"></span>\r\n</div>\r\n\r\n\r\n"),
	
	state : "Incomplete", //Normal, Incomplete, or Error
	
	/**
	 * UI properties: visibility, disable, required, width
	 * 		tabIndex = -1, user can not access a file upload widget using tab
	 */
	required : false,
	disabled: false,
	_visibilityHolder: [],
	_isDisabled_uploadButton : false,
	tabIndex : "-1",
	width : "",
	_browse_width: null,
	
	/**
	 * contained dijit: Text Box, Browse Button, Upload Button, Cancel Button
	 */
	inputText : null,
	f0 : null,
	uploadButton: null,
	cancelButton: null,
	
	//name: "uploadFile",
	/**
	 * _state: validation checking: 
	 * 		none - no file uploaded, 
	 * 		done - file uploaded successfully, 
	 * 		uploading - file is uploading
	 * 		error - error occurs during uploading
	 * 		canceling - file upload progress is cancelling
	 * 		uploading and error state will prevent form submit
	 */
	_state : "none",
	
	/**
	 * Uploaded file name, can load from context in jsp tag
	 * If value isn't null, render the widget as "done" state
	 */
	value : "",
	currentFileInfo : null,
	
	/**
	 * Functional properties: 
	 * 		fileExtension: user can define their file extension limitation
	 * 		fileSize: user can define the max size of file allow to upload, change to configure in server side
	 */
	fileExtension : "",
	//fileSize : null,
	
	/**
	 * Internal properties: 
	 * 		uploadUrl: the server side location to handle file upload request
	 * 		storeDataName: the bound context data to store the file info
	 * 		bttParams: BTT params generated from JSP tag, used to get session ID and processor ID
	 * 		_bundle: NLS support i18n
	 * 		error message for file size&mask limitation, showed as dojo hint
	 */
	uploadUrl: "",
	storeDataName: "",
	bttParams: "",
	_bttParamJSON : null,
	_accessByKey : false,
	
	_bundle : new com.ibm.btt.util.I18nBundle("com.ibm.btt.dijit", "FileUpload"),
	
	/**
	 * Create widget UE:
	 * 		0. parse BTT params
	 * 		1. create inner dijit
	 * 		2. render inner dijit
	 * 		3. connect events
	 * 		4. fire onShow event to make dojox.form.FileUploader create a form inner node
	 */
	postCreate: function(){
		//parse the bttParam as json
		this._bttParamJSON = dojo.fromJson(this.bttParams);
		//create inner dijit
		this.createInsideWidgets();
		//render inner dijit
		this.renderItems();
		
		//connect events 
		this.connectEvents();

		//fire onShow event to make dojox.form.FileUploader create a form inner node.
		this.onShow();
		
		this._tabSupport(false);
		
		this.inherited(arguments);
	},
	
	/**
	 * Create inner dijit in the right DOM node
	 */
	createInsideWidgets : function(){
		//create input box: set as readOnly
		this.inputText = new dijit.form.TextBox({}, this.inputBox);
		dojo.addClass(this.inputText.domNode, "inputBox");
		this.setReadOnly(this.inputText, true);
		
		//hack: remove reset method of input text in order to prevent value reset when file uploading.
		this.inputText.reset = null;
		
		//create upload button
		this.uploadButton = new dijit.form.Button({label: this._bundle.getMessage("UPLOAD_BUTTON_LABEL")}, this.uploadBtn);
		
		//create cancel button
		this.cancelButton = new dijit.form.Button({label: this._bundle.getMessage("CANCEL_BUTTON_LABEL")}, this.clearBtn);
		
		//create browse button
		this.browseBtn.innerHTML = this._bundle.getMessage("BROWSE_BUTTON_LABEL");
		
		//format the POST URL format, parameters: processId, sessionId, dataName, filesize
		var parameters = this._buildParameter();
//		if(this.fileSize){
//			//if fileSize is null, use server side default size limitation
//			parameters+="&filesize="+this.fileSize*1024;
//		};
		
		//create a file uploader
		//ajust IE style problem
		var styleClasses;
		if(dojo.isIE){
			dojo.addClass(this.uploadButton.domNode, "commonButton");
			dojo.addClass(this.cancelButton.domNode, "commonButton");	
		}
		this.f0 = new com.ibm.btt.dijit.FileUploader(dojo.mixin({
				force:"html",
				uploadUrl:this.uploadUrl+parameters,
				showProgress:false,
				selectMultipleFiles:false,
				uploadOnChange:false,
				tabIndex: -1
			}, styleClasses), this.browseBtn);
		
		//hack for alignment problem: set the width of f0.insideNode in order to don't let the label of the browse button move out
		dojo.style(this.f0.insideNode, {
			"width":"0px"
		});
		//calculate a suitable width for the widget
		this._calculateWidth();
	},
	
	_buildParameter : function(){
		var parameters = "?dataName="+this.storeDataName;
		if(this._bttParamJSON.dse_processorId){
			parameters+="&processId="+this._bttParamJSON.dse_processorId;
		}
		if(this._bttParamJSON.dse_sessionId){
			parameters+="&sessionId="+this._bttParamJSON.dse_sessionId;
		}
		return parameters;
	},
	
	/**
	 * adjust the width of the file upload widget:
	 *	//	1. if the width is larger than min width, set to domNode, and adjust the width of input box, and 
	 *	//		all the button display align right.
	 *	//	2. if the width is set smaller than min width, ignore it, since file upload widget will break into two lines. 
	 *	//	3. default min width is set in CSS file based on different theme.	
	 *
	 */
	_calculateWidth : function(){
		//adjust the width of the file upload widget:
		//	1. if the width is larger than min width, set to domNode, and adjust the width of input box, and 
		//		all the button display align right.
		//	2. if the width is set smaller than min width, ignore it, since file upload widget will break into two lines. 
		//	3. default min width is set in CSS file based on different theme.
		var input_width = dojo.style(this.inputText.domNode, "width");
		var upload_button_width = dojo.style(this.uploadButton.domNode, "width");
		var browse_button_width = dojo.style(this.f0.domNode, "width");
		var cancel_button_width = dojo.style(this.cancelButton.domNode, "width");
		var blank = 35;
		var button_width = upload_button_width + browse_button_width + cancel_button_width + blank;
		var minWidth = input_width + button_width;
		if(this.width){
			//console.debug("this.width", this.width);
			var assignedWidth = this.width.substr(0, this.width.lastIndexOf("px")); 
			//console.debug("assignedWidth", assignedWidth);
			if(assignedWidth && assignedWidth > minWidth){
				if(this.width && assignedWidth > minWidth){
					dojo.style(this.fileuploader, "width", this.width);
					dojo.style(this.inputText.domNode, "width", (assignedWidth - button_width)+"px");
				} else {
					dojo.style(this.fileuploader, "width", minWidth+"px");
				}
			}
		}
		
		
		
		//get default width of browse button
		this._browse_width = dojo.style(this.f0.domNode, "width");
	},
	
	/**
	 * Control whether this widget will support tab access. 
	 * Default is "false": this._tabSupport(false) is called in createInsideWidgets
	 * 		
	 * @value boolean value, true for support, false for not support 
	 */
	_tabSupport : function(value){
		if(value){
			//TODO: do we need support TAB access
		} else {
			this.inputText.set('tabIndex', "-1");
			this.f0.domNode.setAttribute('tabIndex', "-1");	
			//wairole="presentation" role="presentation"
			this.f0.domNode.setAttribute('wairole','presentation');
			this.f0.domNode.setAttribute('role','presentation');
			this.f0.insideNode.setAttribute('wairole','presentation');
			this.f0.insideNode.setAttribute('role','presentation');
			this.f0._fileInput.setAttribute('tabIndex', "0");
//			dojo.style(this.f0._fileInput, {
//				opacity:0
//			});
//			if(dojo.isIE){
//				dojo.attr(this.f0.domNode, "tabIndex", "0");
//				this.f0._fileInput.setAttribute('tabIndex', "-1");	
//			}
			//this.f0._fileInput.setAttribute('tabIndex', "-1");	
		}
	},
	
	/**
	 * Render inner dijit based on the value of the widget
	 * 		
	 */
	renderItems : function(){
		console.debug("this.value", this.value)
		if(this.value){
			//file context have data, render widget as "done" state
			this._state = "done";
			this._set("state","");
			
			try{
				this.currentFileInfo = dojo.fromJson(this.value);
			} catch (e) {
				//invalid file info
				console.debug("error occurs", e);
				this._state = "none";
				if(this.required){
					this._set("state", "Incomplete");
				}else{
					this._set("state", "");
				}
				this.value = "";
			}
			
		} else {
			//file context have no data, render widget as "none" state
			this._state = "none";
			if(this.required){
				this._set("state", "Incomplete");
			}else{
				this._set("state", "");
			}
		}
		//init inner widget visibility
		this._initRenderItems();
		//init inner widget properties 
		this._initUIProperties();
	},
	
	/**
	 * Init inner widget visibility
	 * 		
	 */
	_initRenderItems : function(){
		//reset the input text value
		this.inputText.set("value", "");
		//clear message and error
		this._clearMessage();
		//if the state is done, file is successfully uploaded
		if(this._state == "done"){
			console.debug("this.currentFileInfo", this.currentFileInfo);
			//hide input textbox, browse, upload button
			dojo.style(this.f0.domNode, "visibility", "hidden");
			dojo.style(this.f0.insideNode, "visibility", "inherit");
			dojo.style(this.f0.domNode, "width", "0px");
			this.setVisibility(this.inputText.domNode, false, true);
			this.setVisibility(this.uploadButton.domNode, false, true);
			//show cancel button
			this.setVisibility(this.cancelButton.domNode, true);
			//show file name in message section
			this.statusMessage.innerHTML = this.currentFileInfo.name;
		} else {
			//the state isn't "done", reset the UE as "none"
			//show input textbox, browse button
			dojo.style(this.f0.domNode, "visibility", "visible");
			dojo.style(this.f0.insideNode, "visibility", "inherit");
			dojo.style(this.f0.domNode, "width", this._browse_width+"px");
			dojo.fadeIn({ node: this.f0.domNode, duration:275 }).play(); 
			this.setVisibility(this.inputText.domNode, true);
			
			//hide upload button, cancelButton
			this.setVisibility(this.uploadButton.domNode, false, false);
			this.setVisibility(this.cancelButton.domNode, false, false);
		}
		
	},
	
	/**
	 * Init inner widget properties: visibility
	 * 		
	 */
	_initUIProperties : function(){
		this._visibilityHolder = [];
		//if the widget is set as "hidden" or "gone", store the properties and hide it
		if(this.visibility == "hidden" || this.visibility == "gone"){
			if(this._state == "none"){
				this._visibilityHolder.push({dijit: this.inputText.domNode, visibility: "visible"});
				this._visibilityHolder.push({dijit: this.f0.domNode, visibility: "visible"});
				this._visibilityHolder.push({dijit: this.f0.insideNode, visibility: "inherit"});
				this.setVisibility(this.inputText.domNode, false, false);
				dojo.style(this.f0.domNode, "visibility", "hidden");
				dojo.style(this.f0.insideNode, "visibility", "inherit");
			} else {
				this._visibilityHolder.push({dijit: this.cancelButton.domNode, visibility: "visible"});
				this.setVisibility(this.cancelButton.domNode, false, true);
				this._visibilityHolder.push({dijit: this.statusMessage, visibility: "visible"});
				dojo.style(this.statusMessage, "visibility", "hidden");
			}
		}
		
		//this._setDisabledAttr(this.disabled); 
	},
	
	/**
	 * Clear the message sections: uploading message, file info, and error message.
	 * 		
	 */
	_clearMessage : function(){
		//clear message and error
		this.statusMessage.innerHTML = "";
		this.errorMessage.innerHTML = "";
		dojo.style(this.errorMessage, "display", "none");
		this._showErrorInputBox(false);
	},
	
	/**
	 * Connect all the event to perform the basic function of FileUpload
	 */
	connectEvents: function(){
		//when user select a file
		dojo.connect(this.f0, "onChange", this, this._handleSelect);
		
		//when user click upload button, upload file to server side
		dojo.connect(this.uploadButton, "onClick", this, this._handleUpload);
		
		//when upload process complete
		dojo.connect(this.f0, "onComplete", this, function(dataArray){
			//check response json object: name, errorcode		
			var response = dataArray[0];
			console.debug("response", response);
			var message = response.name;
			var errorCode = response.errorCode;
			//here add a "TypeError" check, since parse error in iframe will not call onError
			if(message == "TypeError" || errorCode){  
				this.handleError(errorCode);
			} else {
				this.handleSuccess(response);
			}
		});
		
		//when user click browse, but don't select one file
		dojo.connect(this.f0, "onCancel", this, function(){
			//if the field is required, and currently no file uploaded and no file selected, 
			//give a error hint: change the color of input text as yellow
			if(this.required){
				if(this._state == "none" && (!this.f0._fileInput.value)){
					this._showErrorInputBox(true);	
					this.displayMessage(this._bundle.getMessage("UPLOAD_REQUIRED"));
				}
			}
		});
		
		//when upload process complete
		dojo.connect(this.f0, "onError", this, function(){
			console.debug("onError", this._state);
			if(this._state == "canceling"){
				//the error fired by cancel should not be plaude.
			}else{
				this.handleError();
			}
		});
		
		//handle cancel during uploading 
		dojo.connect(this.cancelButton, "onClick", this, function(){
			this.reset();
		});
	},
	
	/**
	 * Handle user select one file
	 * 	@data: the info of user selected file, contains: name and size (size is not supported here)
	 */
	_handleSelect : function(data){
		//show clear button 
		this.setVisibility(this.cancelButton.domNode, true);
		//show upload button and disable it
		this.setVisibility(this.uploadButton.domNode, true);
		this._clearMessage();
		//get file info
		var fileinfo = data[0];
		//show file name in input text.
		this.inputText.set("value", fileinfo.name);

		//check file mask
		var mask = fileinfo.name.substr(fileinfo.name.lastIndexOf(".") + 1).toLowerCase(); 
		if(this.fileExtension != "" && this.fileExtension.indexOf(mask) == -1){
			//error file mask
			//disable upload button
			this.setDisabled(this.uploadButton, true);
			this._isDisabled_uploadButton = true;
			//show error dojo hint and error input box
			this.displayMessage(this._bundle.getMessage("UPLOAD_ERRORFILEMASK", {value:this.fileExtension}));
			this._showErrorInputBox(true);
			//change state into error and prevent form submit
			this._state = "error";
			this._set("state","Error");
			this.validate();
			
		} else {
			//acceptable file mask
			//enable upload button
			this.setDisabled(this.uploadButton, false);
			this._isDisabled_uploadButton = false;
			//change state into none and fire form submit check
			this._state = "none";
			if(this.required){
				this._set("state", "Incomplete");
			}else{
				this._set("state", "");
			}
			this.validate();
		}
	},
	
	/**
	 * Handle file upload action when user click upload button
	 */
	_handleUpload : function(){
		//change the widget state to uploading, block form submit.
		this._state = "uploading";
		this._set("state", "Incomplete");
		//hide browse and upload button
		this.setVisibility(this.uploadButton.domNode, false, true);
		dojo.style(this.f0.domNode, "visibility", "hidden");
		dojo.style(this.f0.domNode, "width", "0px");
		dojo.fadeOut({ node: this.f0.domNode, duration:275 }).play(); 
		
//		//show clear button - not supported in this iteration 
		this.setVisibility(this.cancelButton.domNode, true);
		
		//show upload status message
		this.statusMessage.innerHTML = "";
		var uploadingImages = document.createElement("img");
		var imgPath = dojo.moduleUrl("com.ibm.btt.dijit", "images/loading.gif");
		uploadingImages.setAttribute("src", imgPath.path);
		this.statusMessage.appendChild(uploadingImages);
		var uploadingMsg = document.createElement("span");
		uploadingMsg.innerHTML = "  " + this._bundle.getMessage("UPLOAD_UPLOADING");
		this.statusMessage.appendChild(uploadingMsg);
		
		console.debug("before f0.upload");
		var uuid = this.getUUID();
		this.f0.fileUploadUUID = uuid;
		//upload the file
		this.f0.upload();
		console.debug("after f0.upload");
		setTimeout(dojo.hitch(this, this._queryFileSizeFromServer),3000); 	
		//fire onUpload event;
		this.onUpload();
		
		
	},
	
	getUUID : function() {
		return dojox.uuid.generateRandomUuid();
	},
	
	_queryFileSizeFromServer: function() {
		
		if(this._state == "uploading" && this.f0.fileUploadUUID) {
			var xhrArgs = {
				url: this.f0.uploadUrl + "&uuid=" + this.f0.fileUploadUUID + "&fileUpLoadAction=querySize",
				handleAs: "json",
				load: dojo.hitch(this, function(data){
					if(data && this._state == "uploading") {
						if(data.errorCode == "7") {
							this.f0.cancel();
						}
					}
				} ),
				error: dojo.hitch(this, function(error){
					if(this._state == "uploading") {
						this.reset();	
					}
				} )
		    };
			dojo.xhrGet(xhrArgs);
		}
		
	},
	
	_clearFizeSizePendingOnServer : function() {
		if(this.f0.fileUploadUUID) {
			var xhrArgs = {
				url: this.f0.uploadUrl + "&uuid=" + this.f0.fileUploadUUID + "&fileUpLoadAction=cancelPending",
				handleAs: "json",
				load: dojo.hitch(this, function(data){
					console.debug("Cancel the file uploading pending on server successfully");
				} ),
				error: dojo.hitch(this, function(error){
					console.debug("Error when canceling the file uploading pending on server");
				} )
		    };
			dojo.xhrGet(xhrArgs);
		}
	},
	
	
	
	/**
	 * Reset the widget's value to what it was at initialization time
	 * 	  when the state is "done", delete upload files
	 * 	  when the state is not done, cancel the upload
	 */
	reset: function(){
		if(this._state == "done"){
			this._handleDelete();
		} else {
			this._handleCancel();
		}
	},
	
	/**
	 * Handle user's cancel action in uploading process or in "none" or "error"
	 */
	_handleCancel : function(){
		if(this._state == "none" || this._state == "error"){
			//user didn't click upload button, just clear user's selection
			this._resetUIforCancel();
			//fire onCancel event
			this.onCancel();
		} else if(this._state == "uploading"){
			this._state = "canceling";
			this._set("state", "Incomplete");
			//cancel the upload
			this.f0.cancel();
			
			//FIXME: HACK FOR SERVER SIDE INTEGRATION
			this._resetUIforCancel();
			//hack dojox.form.FileUploader issues, FileUploader will be disabled when error occurs.
			this.setDisabled(this.f0, false);
			//fire onCancel event
			this.onCancel();
			
			//call DELETE API to clear context and delete files if already saved in server side
			var successCallback = function(response,args){
				this._resetUIforCancel();
				//hack dojox.form.FileUploader issues, FileUploader will be disabled when error occurs.
				this.setDisabled(this.f0, false);
				//fire onCancel event
				this.onCancel();
			};
			var errorCallback = function(response,args){
				//show error message when error occurs during canceling
				this.displayMessage(this._bundle.getMessage("CANCEL_FAILSURE_MESSAGE"));
				this._state = "error";
				this._set("state", "Error");
			};
			this._clearFizeSizePendingOnServer();
			this._deleteFile(successCallback, errorCallback);
		}
	},
	/**
	 * Reset UI when user click Cancel button
	 */
	_resetUIforCancel : function(){
		//change the widget state to none, no file uploaded
		this._state = "none";
		if(this.required){
			this._set("state", "Incomplete");
		}else{
			this._set("state", "");
		}

		//clean user's previous selection
		this.f0._clearUserSelection();
		
		//show the init style of file upload widget
		this._initRenderItems();
		
		
	},
	/**
	 * Handle user's cancel action in 
	 */
	_handleDelete : function(){
		//change state into none, no file uploaded
		this._state = "none";
		if(this.required){
			this._set("state", "Incomplete");
		}else{
			this._set("state", "");
		}
		//show the init style of file upload widget
		this._initRenderItems();
		
		//call DELETE API to clear context and delete files already saved in server side
		var successCallback = function(response,args){
			console.debug("sucess delete");
			//change state into none, no file uploaded
			this._state = "none";
			if(this.required){
				this._set("state", "Incomplete");
			}else{
				this._set("state", "");
			}
			//show the init style of file upload widget
			this._initRenderItems();
			//fire onDelete event
			this.onDelete();
		};
		var errorCallback = function(response,args){
			console.debug("error delete")
			//show error message when error occurs during delete file
			this.displayMessage(this._bundle.getMessage("DELETE_FAILSURE_MESSAGE"));
			this._state = "error";
			this._set("state","Error");
		};
		
		this._deleteFile(successCallback, errorCallback);
	},
	/**
	 * Handle error occurs in uploading
	 * 	@errorcode: the error code responsed from server side.
	 */
	handleError : function(errorcode){
		//change state into error.
		this._state = "error";
		this._set("state","Error");
		//hide uploading message
		this.statusMessage.innerHTML = "";
		//show input text, browse button, upload button and cancel button
		this.setVisibility(this.inputText.domNode, true);
		this._showErrorInputBox(true);
		dojo.style(this.f0.domNode, "visibility", "visible");
		dojo.style(this.f0.domNode, "width", this._browse_width+"px");
		dojo.fadeIn({ node: this.f0.domNode, duration:275 }).play(); 
		this.setVisibility(this.uploadButton.domNode, true);
		//hack dojox.form.FileUploader issues, FileUploader will be disabled when error occurs.
		this.setDisabled(this.f0, false);	
		//disable upload button
		this.setDisabled(this.uploadButton, true);
		this._isDisabled_uploadButton = true;
		//show clear button 
		this.setVisibility(this.cancelButton.domNode, true);
		//check error message
		if(errorcode == "7"){
			//if the file size too large
			//show file size error
			this.displayMessage(this._bundle.getMessage("UPLOAD_FAILSURE_MESSAGE_FILESIZE"));	
		} else {
			//create server error message 
			this.displayMessage(this._bundle.getMessage("UPLOAD_FAILSURE_MESSAGE"));	
		}
		//fire onError event
		this._clearFizeSizePendingOnServer();
		this.onError();
	},
	/**
	 * Handle success for file upload widget
	 * 	@fileinfo: the file info responsed from server side.
	 */
	handleSuccess : function(fileinfo){
		//change state into done, file is uploaded successfully
		this._state = "done";
		this._set("state", "");
		//show file name in message section
		this.statusMessage.innerHTML = fileinfo.name;
		this.value = fileinfo.name;
		this.currentFileInfo = fileinfo;
		console.debug("currentFileInfo", this.currentFileInfo);
		//hide input text box
		this.setVisibility(this.inputText.domNode, false, true);

		//fire onComplete event
		this.onComplete();
	},
	
	/**
	 * Set the style of input box: normal or error
	 * 		@isError: if show as error style
	 */
	_showErrorInputBox : function(/*Boolean*/ isError){
		if(isError){
			dojo.removeClass(this.inputText.domNode, "inputBox");
			dojo.addClass(this.inputText.domNode, "errInputBox");
		} else {
			dojo.removeClass(this.inputText.domNode, "errInputBox");
			dojo.addClass(this.inputText.domNode, "inputBox");
		}
	},
	
	_deleteFile: function(successCallback, errorCallback){
		if(this._bttParamJSON && this.currentFileInfo){
			console.debug("currentFileInfo", this.currentFileInfo)
			var parameters = this._buildParameter();
			parameters+="&fileId="+this.currentFileInfo.fileId;
			dojo.xhrDelete({ 
	            url: this.uploadUrl+parameters,
	            preventCache: true,
	            error: dojo.hitch(this, function(response, args) {
//					console.debug("response", response);
//					console.debug("args", args);
//				 	console.debug("Error occurs when delete file");
				 	dojo.hitch(this, errorCallback)(response, args);
	            }),
	            load: dojo.hitch(this, function(response, args) {
//	            	console.debug("response", response);
//	            	console.debug("args", args);
//	            	console.debug("File is successfully deleted");
	            	if(response.errorCode){
						dojo.hitch(this, errorCallback)(response, args);
					} else {
						this.currentFileInfo = null;
						dojo.hitch(this, successCallback)(response, args);
					}
	            })          
			});
		}
	},
	
	/*************************
	 *	   Public Events	 *
	 *************************/
	
	/**
	 * The following events are inherited from _Widget and still may be connected:
	 * 		onClick
	 * onMouseUp
	 * onMouseDown
	 * onMouseOver
	 * onMouseOut
	 */
	
	/**
	 * stub to connect: Fires when user click upload button.
	 */
	onUpload: function(){
		// trigger form validation test
		this.validate();
	},
	
	/**
	 * stub to connect: Fires when file is uploaded.
	 */
	onComplete: function(){
		// trigger form validation test
		this.validate();
	},
	
	/**
	 * stub to connect: Fires when user cancel the upload process.
	 */
	onCancel: function(){
		// trigger form validation test
		this.validate();	 
	},
	
	/**
	 * stub to connect: Fires when upload process occurs some error.
	 */
	onError: function(){
		// trigger form validation test
		this.validate();
	},
	
	/**
	 * stub to connect: Fires when user delete current uploaded file and want to reupload files.
	 */
	onDelete: function(){
		// trigger form validation test
		this.validate();
	},
	
	validate: function(){

	},
	
	/*************************
	 *	   Public Functions	 *
	 *************************/
	getFileInfo : function(){
		return this.currentFileInfo;
	},
	
	reload : function(){
		this.value = "";
		this.currentFileInfo = null;
		this._resetUIforCancel();
	},
	
	/**
	 * enable set visibility properties.
	 * 	@value: String variable: gone, hidden and visible
	 */
	_setVisibilityAttr : function(value){
		this.visibility = value;
		//need handle contained dijits.
		if (value == "gone") {
			this._allDisappear();
			dojo.style(this.domNode, "visibility", "hidden");
			dojo.style(this.domNode, "display", "none");
		} else if (value == "hidden") {
			this._allDisappear();
			dojo.style(this.domNode, "display", "");
			dojo.style(this.domNode, "visibility", "hidden");	
		} else {
			this._allShowUp();
			dojo.style(this.domNode, "display", "");
			dojo.style(this.domNode, "visibility", "visible");
		}
	},
	
	/**
	 * when set visibility is visible, recover the old state
	 */
	_allShowUp : function(){
		//old state is saved in this._visibilityHolder
		dojo.forEach(this._visibilityHolder, function(v){
			dojo.style(v.dijit, "visibility", v.visibility);
		});
		//clear the old states
		this._visibilityHolder = [];
	},
	
	/**
	 * hold the visibility states util method
	 * 	@domNode: the domNode which visibility state need to store
	 */
	_holdVisibilityFeatures : function(/*DomNode*/domNode){
		this._visibilityHolder.push({dijit: domNode, visibility: "visible"});
	},
	
	/**
	 * when set visibility is hidden or gone, 
	 * save the current state (only visibile dijit) and set visibility as hidden
	 */
	_allDisappear : function(){
		if(this.inputText){
			if(this.isVisible(this.inputText.domNode)){
				this._holdVisibilityFeatures(this.inputText.domNode);
			}
			dojo.style(this.inputText.domNode, "visibility", "hidden");
		}
		if(this.f0){
			if(this.isVisible(this.f0.domNode)){
				this._visibilityHolder.push({dijit: this.f0.domNode, visibility: "visible"});
				this._visibilityHolder.push({dijit: this.f0.insideNode, visibility: "inherit"});
			}
			dojo.style(this.f0.domNode, "visibility", "hidden");
			dojo.style(this.f0.insideNode, "visibility", "inherit");
		}
		if(this.uploadButton){
			if(this.isVisible(this.uploadButton.domNode)){
				this._holdVisibilityFeatures(this.uploadButton.domNode);
			}
			dojo.style(this.uploadButton.domNode, "visibility", "hidden");
		} 
		if(this.cancelButton){
			if(this.isVisible(this.cancelButton.domNode)){
				this._holdVisibilityFeatures(this.cancelButton.domNode);
			}
			dojo.style(this.cancelButton.domNode, "visibility", "hidden");
			//dijit.hideTooltip(this.cancelButton.domNode);
		}
	},
	
	
	/**
	 * show dojo hint
	 * 	
	 */
	displayMessage: function(message){
		dojo.style(this.errorMessage, "display", "");
		if(message){
			this.errorMessage.innerHTML = message;
		}
	},
	
	/**
	 * set visibility of dom node
	 * 	@domNode: the domNode which visibility need to be set
	 *  @visibility: boolean variable, false for hidden, true for visible
	 *  @isHidden: boolean variable, false for display="", true for display="none"
	 */
	setVisibility : function(/*DomNode*/ domNode, /*Boolean*/ visibility, isHidden){
		if(visibility){
			dojo.style(domNode, "visibility", "visible");
			dojo.style(domNode, "display", "");
			//dojo.fadeIn({ node: domNode, duration:275 }).play(); 
		} else {
			dojo.style(domNode, "visibility", "hidden");
			//dojo.fadeOut({ node: domNode, duration:275 }).play(); 
			if(isHidden){
				dojo.style(domNode, "display", "none");
			}
		}
		
	},
	
	/**
	 * check the dom node is visible or hidden
	 * 	@domNode: the domNode which visibility need to be checked
	 */
	isVisible : function(/*DomNode*/ domNode){
		var visibility = dojo.style(domNode, "visibility");
		if( visibility == "visible"){
			return true;
		} else if(visibility == "inherit" && dojo.style(this.domNode, "visibility") == "visible"){
			//hack IE problem, in IE, visibility maybe inherit parent node.
			return true;
		}else {
			return false;
		}
	},
	
	/**
	 * set disable of the dijit
	 * 	@dijit: the dijit which will be disable
	 * 	@value: boolean value: true for disabled, false for undisabled.
	 */
	setDisabled : function(/*Dijit*/ dijit, /*Boolean*/ value){
		if(dijit){
			dijit.set('disabled', value);
		}
	},
	
	/**
	 * set readOnly of the dijit
	 * 	@dijit: the dijit which readOnly will be set 
	 * 	@value: boolean value: true for readOnly, false for non-readOnly.
	 */
	setReadOnly : function(/*Dijit*/ dijit, /*Boolean*/ value){
		if(dijit){
			dijit.set('readOnly', value);
		}
	},
	
	/**
	 * action need perform when form submit
	 * 	hack form submit with "uploadedfile" input in dojox.form.FileUploader, 
	 * 	destory inner form node when form submit
	 */
	onFormSubmit : function(){
		//hack form submit with "uploadedfile" input in dojox.form.FileUploader, destory inner form node when form submit
		if(dojo.isIE){
			this.f0._formNode.innerHTML = "";
		}
	},
	
	/**
	 * enable disabled properties
	 * 	@value: boolean value: true for disabled, false for undisabled. 
	 */
	_setDisabledAttr : function(value){
		this.disabled = value;
		this.inherited(arguments);
		this.setDisabled(this.f0, value);
		//handle upload button seperately, upload button will be disabled when error occurs, 
		//it should not be set to enable when enable the widget
		if(!value){
			this.setDisabled(this.uploadButton, this._isDisabled_uploadButton);
		} else {
			this.setDisabled(this.uploadButton, value);
		}
		
		this.setDisabled(this.cancelButton, value);
	}
});

dojo.declare("com.ibm.btt.dijit.FileUploader",
		[dojox.form.FileUploader],{
	/**
	 * the Defered object created by iframe.send, 
	 * it will be canceled when user cancel the upload process
	 */
	dfd : null,
	//templateString:'<div dojoAttachPoint="containerNode"><div dojoAttachPoint="progNode"><div dojoAttachPoint="progTextNode"></div></div><div dojoAttachPoint="insideNode" class="uploaderInsideNode"></div></div>',
	trueFocus : false,
	isShowDialog : false,
	fileUploadUUID : "",
	/**
	 * cancel the upload process
	 * 	1. cancel the Deferred object
	 *  2. abort the request
	 */
	cancel: function(){
			if(this.dfd){
				//cancel the Deferred object
				this.dfd.cancel();
				if(dojo.isIE){
					//reset the iframe location
					dojo.io.iframe._frame.contentWindow.document.location.replace("about:blank");
				} else {
					//stop the iframe window
					dojo.io.iframe._frame.contentWindow.stop();
				}
				
			}
	},
	
	/**
	 * override the uploadHTML method of dojox.form.FileUploader
	 * save the iframe.send method created Defered object as the object attribute
	 */
	uploadHTML: function(){
		if(this.selectMultipleFiles){
			dojo.destroy(this._fileInput);
		}
		this._setHtmlPostData();
		if(this.showProgress){
			this._animateProgress();
		}
		if(this.dfd){
			dojo.destroy(this.dfd);
		}
		
		//save the iframe.send method created Defered object as the object attribute
		this.dfd = dojo.io.iframe.send({
			url: this.fileUploadUUID ? (this.uploadUrl + "&uuid=" + this.fileUploadUUID) : this.uploadUrl,
			form: this._formNode,
			handleAs: "json",
			error: dojo.hitch(this, function(err){
				console.debug("error", err.message);
				this._error("HTML Upload Error:" + err.message);
			}),
			load: dojo.hitch(this, function(data, ioArgs, widgetRef){
				this._complete(data);
			})
		});
		
		console.debug("dfd", this.dfd);
	},
	

	
	_clearUserSelection : function(){
		this.fileInputs = [];
		if(dojo.isIE){
			//value of input(type=file) is readOnly, need rebuild the input.
			if(this._fileInput){
				this._disconnect();
				this._formNode.removeChild(this._fileInput);
			}
			this._fileInput = document.createElement('input');
			this.fileInputs.push(this._fileInput);
			var nm = this.htmlFieldName;
			var _id = this.id;
			if(this.selectMultipleFiles){
				nm += this.fileCount;
				_id += this.fileCount;
				this.fileCount++;
			}
			dojo.attr(this._fileInput, {
				id:this.id,
				name:nm,
				type:"file",
				onKeyPress: function (){
					return !(window.event && window.event.keyCode == 13);
				}()
			});
			dojo.addClass(this._fileInput, "dijitFileInputReal");
			this._formNode.appendChild(this._fileInput);
			var real = dojo.marginBox(this._fileInput);
			dojo.style(this._fileInput, {
				position:"relative",
				left:(this.fhtml.nr.w - real.w) + "px",
				opacity:0
			});
			this._connectInput();
		} else {
			this._fileInput.value = "";
		}
		
	},
	
	attributeMap: dojo.delegate(dijit._Widget.prototype.attributeMap, {
		tabIndex: "insideNode"
	}),
	
	onFocusOnInputText : function(){
		
	},
	
	_connectInput: function(){
		//this.inherited(arguments);
		//When migrate to dojo1.6.1, this part of code can be removed.
		this._disconnect();
		this._cons.push(dojo.connect(this._fileInput, "mouseover", this, function(evt){
			dojo.addClass(this.domNode, this.hoverClass);
			this.onMouseOver(evt);
		}));
		this._cons.push(dojo.connect(this._fileInput, "mouseout", this, function(evt){
			
			setTimeout(dojo.hitch(this, function(){
				dojo.removeClass(this.domNode, this.activeClass);
				dojo.removeClass(this.domNode, this.hoverClass);
				this.onMouseOut(evt);
				this._checkHtmlCancel("off");
			}), 0);
		}));
		this._cons.push(dojo.connect(this._fileInput, "mousedown", this, function(evt){
			dojo.addClass(this.domNode, this.activeClass);
			dojo.removeClass(this.domNode, this.hoverClass);
			this.onMouseDown(evt);
		}));
		this._cons.push(dojo.connect(this._fileInput, "mouseup", this, function(evt){
			dojo.removeClass(this.domNode, this.activeClass);
			this.onMouseUp(evt);
			this.onClick(evt);
			this._checkHtmlCancel("up");
		}));
		this._cons.push(dojo.connect(this._fileInput, "change", this, function(){
			this._checkHtmlCancel("change");
			this._change([{
				name: this._fileInput.value,
				type: "",
				size: 0
			}]);
		}));
		if(this.tabIndex>=0){
			dojo.attr(this.domNode, "tabIndex", this.tabIndex);
		}
		//
		
		this._cons.push(dojo.connect(this._fileInput, "focus", this, function(){
			//console.debug("focus on fileInput");
			if(!dojo.isIE){
				dojo.addClass(this.domNode, this.activeClass);
			} else {
				this.trueFocus = true;	
			}
			if(this.dialogIsOpen){
				if(dojo.isIE){
					dojo.addClass(this.domNode, this.activeClass);
				}
				this.onCancel();
			}
			this.dialogIsOpen = false;
		}));
		
		if(dojo.isIE){
			this._cons.push(dojo.connect(this._fileInput, "keypress", this, function(evt){
				//console.debug("keypress on fileInput", evt.keyCode)
				//console.debug("trueFocus", this.trueFocus)
				if(evt.keyCode==dojo.keys.TAB && this.trueFocus){
//					console.debug("press TAB");
					dojo.addClass(this.domNode, this.activeClass);
				} else if(evt.charCode==dojo.keys.SPACE && this.trueFocus){
					//console.debug("press SPACE");
					this.dialogIsOpen = true;
				} else if (evt.keyCode == dojo.keys.ENTER){
					dojo.stopEvent(evt);
				}
			}));
		} else {
			this._cons.push(dojo.connect(this._fileInput, "keypress", this, function(evt){
				//console.debug("keypress on fileInput", evt)
				//SPACE: charCode=32, keyCode=0
				if(evt.charCode==dojo.keys.SPACE){
					//console.debug("press SPACE");
					this.dialogIsOpen = true;
				}
			}));
		}
		
		
		this._cons.push(dojo.connect(this._fileInput, "blur", this, function(evt){
			//console.debug("lose focus on fileInput", evt)
			dojo.removeClass(this.domNode, this.activeClass);
			if(dojo.isIE){
				this.trueFocus = false;
			}
		}));
		
	},
	
	applyAccessKey : function(){
		if(this.f0._fileInput && this.accessKey){
			this.f0._fileInput.setAttribute('accessKey', this.accessKey);
		}
	}
});

}

if(!dojo._hasResource["com.ibm.btt.dijit.Group"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.Group"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit.Group");

 
 




dojo.declare("com.ibm.btt.dijit.Group", [dijit._Widget,
                                         dijit._Templated,
                                         dijit._Container,
                                         dijit.layout._ContentPaneResizeMixin,
                                         com.ibm.btt.dijit.AbstractWidgetMixin], {
	
	text : "",

	parseOnLoad: true,
	
	isContainer: true,
	
	width : "",
	
	height : "",
	
	templateString : "<fieldset dojoAttachPoint='domNode' class='dijitGroupBase'><legend dojoAttachPoint='textNode'></legend><div dojoAttachPoint='containerNode'></div></fieldset>",
	
	attributeMap: dojo.delegate(dijit._Widget.prototype.attributeMap, {
		text : {
			node : "textNode"
		},
		width : {
			node : "containerNode"
		},
		height : {
			node : "containerNode"
		}
	}),
	
	/**
	 * 
	 * hook method for text attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setTextAttr : function(value) {
		this.text = value;
		this.textNode.innerHTML = StringUtil.escapeHTML(this.getI18NString(value));
	},
	
	/**
	 * 
	 * hook method for width attribute
	 * 
	 * For Group, the container node must inherite the size of widget
	 * and set the inside elements overflow to hidden, otherwise the
	 * inside elements may break the size
	 *
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setWidthAttr : function(value) {
		if (value != "") {
			this.width = value;
			dojo.style(this.domNode, "width", this.handleLenUint(this.width));
			dojo.style(this.domNode, "overflow", "hidden");
		}
	},
	
	/**
	 * 
	 * hook method for height attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setHeightAttr : function(value){
		if (value != "") {
			this.height = value;
			dojo.style(this.domNode, "height", this.handleLenUint(this.height));
		}
	}
	
});

}

if(!dojo._hasResource["com.ibm.btt.dijit.TabbedPane"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.TabbedPane"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit.TabbedPane");






dojo.declare("com.ibm.btt.dijit.TabbedPane", [dijit.layout.TabContainer,
                                              com.ibm.btt.dijit.AbstractWidgetMixin],{
	width : "800",
	
	height : "600",

	constructor: function(){
    	this._disableWatch = {};
    },
	
	postMixInProperties : function() {
		this.inherited(arguments);
		this.controllerWidget = (this.tabPosition == "top" || this.tabPosition == "bottom")
			&& !this.nested ? "com.ibm.btt.dijit.ScrollingTabController" : "com.ibm.btt.dijit.TabController";
	},
	
	startup : function(){
		this.inherited(arguments);
		this.set("visibility",this.visibility);
		
		//watch disabled attribute of all children,
		//if one child is disabled and this child is current selected
		//then select another enabled child
		var children = this.getChildren();
		dojo.forEach(children, function(child){
			this._disableWatch[child.id] = child.watch("disabled", dojo.hitch(this, this._checkDisabedPane, child));
		}, this);
		this._setInitialTabSelection();
	},
	
	
	/**
	 * 
	 * hook method for Visibility attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setVisibilityAttr : function(value){
		this.inherited(arguments);
		if(typeof(this.tablist)!=="undefined"){
			if (value == "gone") {
				dojo.style(this.tablist.domNode, "visibility", "visible");
			} else if (value == "hidden") {
				dojo.style(this.tablist.domNode, "visibility", "hidden");
			} else {
				dojo.style(this.tablist.domNode, "visibility", "visible");
			}
		}
	},
	
	/**
	 * 
	 * close the tab by tab index
	 * 
	 * @tag public 
	 * 
	 * @param 
	 * */
	closeChildByIndex : function(i){
		var children = this.getChildren();
		this.closeChild(children[i]);
	},
	
	closeChildById : function(id){
		var children = this.getChildren();
		for(var i=0;i<children.length;i++){
			if(id===children[i].id){
				this.closeChild(children[i]);
			}
		}
	},
	
	selectChildByIndex : function(i){
		var children = this.getChildren();
		this.selectChild(children[i]);
	},
	
	selectChildById : function(id){
		var children = this.getChildren();
		for ( var i = 0; i < children.length; i++) {
			if (id === children[i].id) {
				this.selectChild(children[i]);
				break;
			}
		}
	},
	
	closeChild : function(child){
		if (child.get("disabled") != true) {
			this.inherited(arguments);
		}
	},
	
	selectChild : function(child){
		if (child.get("disabled") != true) {
			this.inherited(arguments);
		}
	},
	
	hideTabByIndex : function(index){
		var children = this.getChildren();
		//check if the input index is a valid number of current tabs
		if (index > -1 && index < children.length) {
			
			//check and save all visible tabs
			var visibleTabs = this._getCurrentVisibleTabs();
			
			//check if there is only one visible tab shown
			//we do nothing, just ignore the hide action
			if (visibleTabs.length > 1) {
				//find the child specified by index
				var child = children[index];
				//find and hide the related tab
				var button = this.tablist.pane2button[child.id];
				dojo.style(button.domNode, "display", "none");
				button._displayMark = "hidden";
				
				//if there are still visible tabs and current tab is just the tab to be hide
				//we need to select the next one tab, and if it is the last tab, we select the previous one.
				if (child.selected) {
					var i;
					for (i = 0; i < visibleTabs.length; i++) {
						if (visibleTabs[i].id == child.id) {
							break;
						}
					}
					if (i + 1 < visibleTabs.length) {
						//If this tab is not the last visible one, we select the next one
						this.selectChildById(visibleTabs[i + 1].id);
					} else {
						//If this tab is the last one, we select the previous one
						this.selectChildById(visibleTabs[i - 1].id);
					}
				}
			} 
		}
		
	},
	
	showTabByIndex : function(index){
		var children = this.getChildren();
		if (index > -1 && index < children.length) {
			var child = this.getChildren()[index];
			this.showTabById(child.id);
		}
	},
	
	hideTabById : function(id){
		var children = this.getChildren();
		for ( var i = 0; i < children.length; i++) {
			if (id === children[i].id) {
				this.hideTabByIndex(i);
				break;
			}
		}
	},
	
	showTabById : function(id){
		//set the specified tab to be visible
		var button = this.tablist.pane2button[id];
		dojo.style(button.domNode, "display", "");
		button._displayMark = "visible"; // add a mark to tab to record this one is visible
		
	},
	
	removeChild: function(/*dijit._Widget*/ child){
		this.inherited(arguments);
		//override removeChild to remove the listener of disabled property when child is removed
		this._disableWatch[child.id].unwatch();
		delete this._disableWatch[child.id];
	},
		
	addChild: function(/*dijit._Widget*/ child, /*Integer?*/ insertIndex){
		this.inherited(arguments);
		//override addChild method to add listener child pane's disabled property when there is a new child add into this container
		this._disableWatch[child.id] = child.watch("disabled", dojo.hitch(this, this._checkDisabedPane, child));
	},
	
	/**
	 * 
	 * This method is used to listen and check child pane
	 * when child pane's disabled attribute changed
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_checkDisabedPane : function(child, name, oldValue, value){
		//set corresponding the style class to tab depends on 
		//the tab is disabled or not
		if (value == true) {
			var button = this.tablist.pane2button[child.id];
			button.set("disabled", true);
			//dojo.addClass(button.domNode, "dijitDisabled");
		} else {
			var button = this.tablist.pane2button[child.id];
			button.set("disabled", false);
			if (dojo.isIE) {
				dojo.removeAttr(child.domNode, "disabled");
			}
			//dojo.removeClass(button.domNode, "dijitDisabled");
		}
		
		//Check If user try to disable the current select tab,
		//find and set the next enabled tab to be selected. If there is no enabled 
		//button after current one, try to find one before current one.
		//If all tabs are disabled, then do nothing, all tabs can not be selected or changed
		this._setTabSelection();
	},
	
	_setInitialTabSelection: function(){
		var visibleTabs = this._getCurrentVisibleTabs();
		var count = 0;
		for (var i = 0; i < visibleTabs.length; i++) {
			if (visibleTabs[i].get("disbaled") == true) {
				count++;
			}
		}
		
		if (visibleTabs.length > 0 && count == visibleTabs.length) {
			visibleTabs[0].disable = false;
			this.selectChildByIndex(0);
			visibleTabs[0].disable = true;
		} else {
			this._setTabSelection();
		}
	},
	
	_setTabSelection : function(){
		var visibleTabs = this._getCurrentVisibleTabs();
		var selectedTabId = -1;
		for (var i = 0; i < visibleTabs.length; i++) {
			if (visibleTabs[i].selected) {
				selectedTabId = i;
			}
		}
		if (selectedTabId > -1 && visibleTabs[selectedTabId].get("disabled") == true) {
			// check and save all visible tabs
			for ( var m = selectedTabId + 1; m < visibleTabs.length; m++) {
				if (visibleTabs[m].get("disabled") == false) {
					this.selectChildById(visibleTabs[m].id);
					return;
				}
			}
			for ( var m = selectedTabId - 1; m >= 0; m--) {
				if (visibleTabs[m].get("disabled") == false) {
					this.selectChildById(visibleTabs[m].id);
					return;
				}
			}
		}
	},
	
	/**
	 * An internal method to get the contentPane instances who's tab is still visible
	 * 
	 * @tag private 
	 * */
	_getCurrentVisibleTabs : function(){
		var children = this.getChildren();
		var visibleTabs = [];
		for ( var i = 0; i < children.length; i++) {
			var button = this.tablist.pane2button[children[i].id];
			if (!button._displayMark || button._displayMark == "visible") {
				visibleTabs.push(children[i]);
			}
		}
		return visibleTabs;
	},
	
	/**
	 * 
	 * hook method for width attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setWidthAttr : function(value) {
		if (value != "") {
			this.width = value;
			dojo.style(this.domNode, "width", this.handleLenUint(this.width));
		}
	},

	/**
	 * 
	 * hook method for height attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setHeightAttr : function(value) {
		if (value != "") {
			this.height = value;
			dojo.style(this.domNode, "height", this.handleLenUint(this.height));
		}
	}
	

});

dojo.declare("com.ibm.btt.dijit.ScrollingTabController", [dijit.layout.ScrollingTabController,com.ibm.btt.dijit.AbstractWidgetMixin],{
	
});

dojo.declare("com.ibm.btt.dijit.TabController", [dijit.layout.TabController,com.ibm.btt.dijit.AbstractWidgetMixin],{
	
});

}

if(!dojo._hasResource["com.ibm.btt.dijit.ContentPane"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.ContentPane"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit.ContentPane"); 





dojo.declare("com.ibm.btt.dijit.ContentPane", [dijit.layout.ContentPane, 
                                               com.ibm.btt.dijit.AbstractWidgetMixin,
                                               com.ibm.btt.dijit.AbstractAjaxMixin],{
	
	
	disabled : false,
	
	/**
	 * 
	 * hook set method for disabled attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setDisabledAttr : function(value){
		this._set("disabled", value);
	},
	
	/**
	 * 
	 * hook set method for title attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setTitleAttr : function(value){
		this.titleKey = value;
		var _title = this.getI18NString(value);
		this._set("title", _title);
	},
	
	/**
	 * 
	 * hook get method for title attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_getTitleAttr : function(){
		return this.titleKey;
	}
	
}); 
	

}

if(!dojo._hasResource["com.ibm.btt.dijit.Hidden"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.Hidden"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
 */

dojo.provide("com.ibm.btt.dijit.Hidden");



dojo.declare("com.ibm.btt.dijit.Hidden", [dijit._Widget, dijit._Templated ], {

	value : "",

	name : "",
	
	state : "",
	
	type : "hidden",

	templateString : "<input type='${type}'/>",

	attributeMap : dojo.delegate(dijit._Widget.prototype.attributeMap, {
		
		value : {
			node : "domNode"
		},
		
		name : {
			node : "domNode"
		}

	}),
	
	/**
	 * 
	 * hook method for value attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setValueAttr : function(value) {
		this.value = value;
		this.domNode.value = value;
	}
});

}

if(!dojo._hasResource["com.ibm.btt.event.BaseMonitor"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.event.BaseMonitor"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.event.BaseMonitor");


dojo.declare("com.ibm.btt.event.BaseMonitor", null,{
	
	oldEvent : null,

	
	monitorEvent : function( event, rule){
	   
    },
    
	    
    monitorStartRule : function( event, rule){
    		  
    },
    
    monitorEndRule : function( event, rule){
    	
    },

	 
	monitorCondition : function (event, rule, result){
				
	},
	
	monitorStartAG : function (rule){
		  
    },
    
    monitorEndAG : function (rule){
    	
    },
	 
	monitorAGCondition : function (rule, result){
				
	},
	
	monitorCallFunctionAction: function(id, functionName, parameter){
		
	},
	
	monitorGetPropertyAction: function (id, property, value){
	  
	},
	
	monitorSetPropertyAction: function (id, property, value){
		
	}
	
	
});

}

if(!dojo._hasResource["com.ibm.btt.dijit.GridComparer"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.GridComparer"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/
dojo.provide("com.ibm.btt.dijit.GridComparer");

/**
 * Generate the comparer for BTT type to enable client side sorting.
 *   All the compare function have two parameters @str1 and @str2, which is the two object need to compare.
 *   The function will return 1 when @str1 is larger then @str2
 *   				   return -1 when @str1 is smaller then @str2
 *   				   return 0 when @str is equals to @str2
 *   
 *   Every function have a parameter @attrs, which hold all the parameters of the comparer in JSON format 
 *   which defined in the grid column tag, such as "pattern" for Date. 
 * 
 *   The class is designed as a singleton, get the instance using com.ibm.btt.dijit.GridComparer.instance.
 *   
 */
dojo.declare("com.ibm.btt.dijit.GridComparer", null, {
	/**
	 * generate the compare function for BTT Type Number.
	 * @attrs: which hold all the parameters of the comparer in JSON format which defined in the grid column tag. 
	 * 
	 */
	compareNumber : function(attrs){
	
		var cons = {};
		if (attrs['pattern']) {
				cons['pattern'] = attrs['pattern'];
		}

		return function(str1, str2){
			var num1;
			if(typeof str1 == "string"){
				num1 = dojo.number.parse(str1, cons);
			} else {
				num1 = str1;
			}
			if(isNaN(num1)){
				num1 = Number(str1);
			}
			var num2;
			if(typeof str2 == "string"){
				num2 = dojo.number.parse(str2, cons);
			} else {
				num2 = str2;
			}
			if(isNaN(num2)){
				num2 = Number(str1);
			}
			if(num1 > num2){
				return 1;
			} else if(num1 < num2){
				return -1;
			} else {
				return 0;
			}
		};
	},
	
	/**
	 * generate the compare function for BTT Type Currency.
	 * @attrs: which hold all the parameters of the comparer in JSON format which defined in the grid column tag. 
	 * 
	 */
	compareCurrency : function(attrs){
		return function(str1, str2){
			var num1 = parseFloat(str1);
			var num2 = parseFloat(str2);
			if(num1 > num2){
				return 1;
			} else if(num1 < num2){
				return -1;
			} else {
				return 0;
			}
		};
	},
	
	/**
	 * generate the compare function for BTT Type String.
	 * @attrs: which hold all the parameters of the comparer in JSON format which defined in the grid column tag. 
	 * 
	 */
	compareString : function(attrs){
		return function(str1, str2){
			if(str1 > str2){
				return 1;
			} else if(str1 < str2){
				return -1;
			} else {
				return 0;
			}
		};
	},
	
	/**
	 * generate the compare function for BTT Date Currency.
	 * @attrs: which hold all the parameters of the comparer in JSON format which defined in the grid column tag. 
	 * 
	 */
	compareDate : function(attrs){
		return function(str1, str2){
			var pattern = "yyyy-MM-dd";
			if(attrs){
				var config_pattern = attrs["pattern"];
				if(config_pattern){
					pattern = config_pattern;
				}
			}
			var option = {
				selector:"date",
				datePattern:pattern,
				fullYear:true
			};
			var _date1;
			var _date2;
			if (typeof str1 == "string") {
				_date1 = dojo.date.locale.parse(str1, option);
			} else {
				_date1 = str1;
			}
			if (typeof str2 == "string") {
				_date2 = dojo.date.locale.parse(str2, option);
			} else {
				_date2 = str2;
			}
			var date1 = _date1 ? _date1 : str1;
			var date2 = _date2 ? _date2 : str2;
			return dojo.date.compare(date1, date2);
		};
	}
});
(function(){
	if( com.ibm.btt.dijit.GridComparer.instance == undefined ){
		com.ibm.btt.dijit.GridComparer.instance = new com.ibm.btt.dijit.GridComparer();	
	}
})();

}

if(!dojo._hasResource["com.ibm.btt.dijit.AbstractWidgetSizeMixin"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.AbstractWidgetSizeMixin"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit.AbstractWidgetSizeMixin"); 

dojo.declare("com.ibm.btt.dijit.AbstractWidgetSizeMixin", null,{
	
	width:"",
	
	height:"",
	
	/**
	 * 
	 * hook method for width attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setWidthAttr : function(value) {
		if (value != "") {
			this.width = value;
			dojo.style(this.domNode, "width", this.handleLenUint(this.width));
		}
	},

	/**
	 * 
	 * hook method for height attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setHeightAttr : function(value) {
		if (value != "") {
			this.height = value;
			dojo.style(this.domNode, "height", this.handleLenUint(this.height));
		}
	},
	
	handleLenUint : function(value) {
		var endWith = function(src, oString) {
			var reg = new RegExp(oString + "$");
			return reg.test(src);
		};
		if(endWith(value, "px") || endWith(value, "%") || endWith(value, "em")){
			return value;
		}else{
			return value + "px";
		}
	}
	
}); 
	

}

if(!dojo._hasResource["com.ibm.btt.event.ConsoleMonitor"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.event.ConsoleMonitor"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.event.ConsoleMonitor");



dojo.declare("com.ibm.btt.event.ConsoleMonitor", com.ibm.btt.event.BaseMonitor,{
	 

   
    monitorStartRule : function( event, rule){
    	console.debug("Start Rule : " + (rule.name ? "[" +  rule.name + "]" : ""), rule,"  for event ", event.id+"."+event.e);
  	  
    },
    
    monitorEndRule : function( event, rule){
    	console.debug("End Rule : " + (rule.name ? "[" + rule.name + "]" : ""), rule,"  for event ", event.id+"."+event.e);
    },

	 
	monitorCondition : function (event, rule, result){
		console.debug("    Evaluated Condition : Condition =", rule.cond, ",  Result="+result );
		
	},
	
	monitorStartAG : function (rule){
		console.debug("Start Action Group : " + rule.name, rule);
    },
    
    monitorEndAG : function (rule){
    	console.debug("End Action Group : " + rule.name, rule);
    },
	 
	monitorAGCondition : function (rule, result){
    	console.debug("    Evaluated Condition : Condition =", rule.cond, ",  Result=" + result );		
	},
	
	monitorCallFunctionAction: function(id, functionName, args, result){
		if (typeof (result) != "undefined" && result != null)
			console.debug("    CallFunction Action : ", id+"."+functionName , " , args=",args, ", result=",result);
		else 
			console.debug("    CallFunction Action : ", id+"."+functionName , " , args=",args);
	},
	
	monitorGetPropertyAction: function (id, property, value){	   
		console.debug("    GetProperty Action : ", id+"."+property+"=="+value );
	},
	
	monitorSetPropertyAction: function (id, property, value){
		console.debug("    SetProperty Action : ", id+"."+property+"="+value );
	}
	
	
	
});

}

if(!dojo._hasResource["com.ibm.btt.util.GlobalFunctions"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.util.GlobalFunctions"] = true;
dojo.provide("com.ibm.btt.util.GlobalFunctions");




/*
 * Licensed Materials - Property of IBM Restricted Materials of IBM 5724-H82 (C)
 * Copyright IBM Corp.2011 All Rights Reserved. US Government Users Restricted
 * Rights - Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp
 */

(function() {

	/**
	 * Util Functions For Internal Use Only
	 */

	function isNull(obj) {
		return typeof (obj) == "undefined" || obj == null ? true : false;
	}

	function isNumber(obj) {
		if ((obj.constructor === Number && !isFinite(obj) && !isNaN(obj))
				|| /^[-+]?\d+$|^[-+]?\d+\.\d+$/.test(obj)) {
			return true;
		} else {
			return false;
		}
	}

	function toNumber(obj) {
		if (obj.constructor === Number) {
			return obj;
		} else {
			return Number(obj);
		}
	}

	function isDate(obj) {
		if (obj.constructor === Date) {
			return true;
		} else {
			return false;
		}
	}

	var bttString = {
		
		getI18NString : function(arg){
			return I18nUtil.getI18nString(arg);
		},	
			
		/**
		 * Functions for string type
		 */

		/*
		 * returns the length of a string
		 */
		length : function(str) {
			return isNull(str) ? undefined : str.toString().length;
		},

		/*
		 * returns a portion of a string
		 */
		subString : function(str, start, end) {
			if (!isNull(str) && isNumber(start) && isNumber(end)) {
				start = toNumber(start);
				end = toNumber(end);
				if (start > end || start < 0 || end > str.toString().length) {
					return undefined;
				} else {
					return str.toString().substring(start, end);
				}
			} else {
				return undefined;
			}
		},

		/*
		 * returns the position of a substring
		 */
		indexOf : function(str, substr) {
			return isNull(str) || isNull(substr) ? undefined : str.toString()
					.indexOf(substr.toString());
		},

		/*
		 * returns the position of a substring starting from the end
		 */
		lastIndexOf : function(str, substr) {
			return isNull(str) || isNull(substr) ? undefined : str.toString()
					.lastIndexOf(substr.toString());
		},

		/*
		 * returns whether a substring is part of a string
		 */
		contains : function(str, str2) {
			if (isNull(str) || isNull(str2)) {
				return false;
			} else {
				return this.indexOf(str.toString(), str2.toString()) > -1 ? true
						: false;
			}
		},

		/*
		 * replaces all occurrences of a substring in a string with a new value
		 */
		replace : function(source, str1, str2) {
			return !isNull(source) && !isNull(str1) && !isNull(str1) ? source
					.toString().replace(new RegExp(str1.toString(), "g"),
							str2.toString()) : source;
		},

		/*
		 * remove leading and trailing blanks
		 */
		trim : function(str) {
			return isNull(str) ? undefined : str.toString().replace(
					/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '');
		},

		/*
		 * string concatenation
		 */
		concat : function(str1, str2) {
			if (isNull(str1) && isNull(str2)) {
				return undefined;
			} else if (isNull(str1)) {
				return str2.toString();
			} else if (isNull(str2)) {
				return str1.toString();
			} else {
				return str1.toString().concat(str2.toString());
			}
		},

		/*
		 * converts to upper case
		 */
		upperCase : function(str) {
			return isNull(str) ? undefined : str.toString().toUpperCase();
		},

		/*
		 * converts to lower case
		 */
		lowerCase : function(str) {
			return isNull(str) ? undefined : str.toString().toLowerCase();
		},

		/*
		 * compares two strings
		 */
		compare : function(str1, str2) {
			if (isNull(str1) || isNull(str2)) {
				return undefined;
			}
			if (str1.toString() > str2.toString()) {
				return 1;
			} else if (str1.toString() < str2.toString()) {
				return -1
			} else {
				return 0;
			}
		},

		/*
		 * compares ignoring case
		 */
		compareIgnoreCase : function(str1, str2) {
			return isNull(str1) || isNull(str2) ? undefined : str1.toString()
					.toUpperCase().localeCompare(str2.toString().toUpperCase());
		}
	};

	var bttDate = {
		/**
		 * functions for date type
		 */

		/*
		 * returns current date
		 */
		today : function() {
			return new Date();
		},

		/*
		 * adds days / months / years to a date
		 */
		after : function(date, days, months, years) {
			if (isNull(date) || !isDate(date)) {
				return undefined;
			}
			if (!isNull(days) && isNumber(days)) {
				date.setDate(date.getDate() + toNumber(days));
			}
			if (!isNull(months) && isNumber(months)) {
				date.setMonth(date.getMonth() + toNumber(months));
			}
			if (!isNull(years) && isNumber(years)) {
				date.setFullYear(date.getFullYear() + toNumber(years));
			}
			return date;
		},

		/*
		 * same as after, but substracting
		 */
		before : function(date, days, months, years) {
			if (isNull(date) || !isDate(date)) {
				return undefined;
			}
			if (!isNull(days) && isNumber(days)) {
				date.setDate(date.getDate() - toNumber(days));
			}
			if (!isNull(months) && isNumber(months)) {
				date.setMonth(date.getMonth() - toNumber(months));
			}
			if (!isNull(years) && isNumber(years)) {
				date.setFullYear(date.getFullYear() - toNumber(years));
			}
			return date;
		},

		/*
		 * compares two dates
		 */
		daysBetween : function(date1, date2) {
			if (isNull(date1) || isNull(date2) || !isDate(date1)
					|| !isDate(date2)) {
				return undefined;
			}
			var difference = Date.UTC(date1.getFullYear(), date1
					.getMonth(), date1.getDate(), date1.getHours(),
					date1.getMinutes(), date1.getSeconds(), date1
							.getMilliseconds())
					- Date.UTC(date2.getFullYear(), date2.getMonth(),
							date2.getDate(), date2.getHours(), date2
									.getMinutes(), date2.getSeconds(),
							date2.getMilliseconds());
			return difference / (1000 * 60 * 60 * 24);
		},

		naturalDaysBetween : function(date1, date2) {
			if (isNull(date1) || isNull(date2) || !isDate(date1)
					|| !isDate(date2)) {
				return undefined;
			}
			var difference = Date.UTC(date1.getFullYear(), date1
					.getMonth(), date1.getDate(), 0, 0, 0, 0)
					- Date.UTC(date2.getFullYear(), date2.getMonth(),
							date2.getDate(), 0, 0, 0, 0);
			return difference / (1000 * 60 * 60 * 24);
		},

		/*
		 * returns the week day of a date
		 */
		dayOfWeek : function(date) {
			if (isNull(date) || !isDate(date)) {
				return undefined;
			}
			return date.getDay();
		},

		/*
		 * returns the year of a date
		 */
		year : function(date) {
			if (isNull(date) || !isDate(date)) {
				return undefined;
			}
			return date.getFullYear();
		},

		/*
		 * returns the month of a date
		 */
		month : function(date) {
			if (isNull(date) || !isDate(date)) {
				return undefined;
			}
			return date.getMonth();
		},

		/*
		 * returns the day of the month
		 */
		day : function(date) {
			if (isNull(date) || !isDate(date)) {
				return undefined;
			}
			return date.getDate();
		},
		
		/*
		 * This function is used to convert this string data to an object. The second parameter is optional.
		 * If the second parameter is defined we will use this pattern to parse the data. If this pattern is not defined
		 * the format of the date should follow the ISO standard like 2011-12-15.
		 */
		parseDate : function(obj, pattern) {
			if(pattern){
				var options = {};
				options.formatLength = 'long';
				options.datePattern = pattern;
				options.selector = 'date';
				try{
					var tmpValue = dojo.date.locale.parse(obj, options);
					if(tmpValue != null){
						return tmpValue;
					}else{
						return undefined;
					}
				}catch(ee){
					return undefined;
				}
						
			}else{
				if (isNull(obj) || !(/^\d{4}-\d{2}-\d{2}$/.test(obj.toString()))) {
					return undefined;
				}
				return new Date(obj);	
			}
		},
		
		toString : function(obj) {
			if (isNull(obj) || !isDate(obj)) {
				return undefined;
			}
			var month = obj.getMonth() + 1;
			if (month < 10) {
				month = "0" + month;
			}
			var day = obj.getDate();
			if (day < 10) {
				day = "0" + day;
			}
			return obj.getFullYear() + "-" + month + "-" + day;
		}
		
	};

	var bttNumber = {
		/**
		 * Functions for number type
		 */

		/*
		 * returns the rounding of a decimal value
		 */
		round : function(num) {
			if (isNull(num) || !isNumber(num)) {
				return undefined;
			}
			return Math.round(num);
		},

		/*
		 * returns the truncation of a decimal value
		 */
		truncate : function(num, flag) {
			if (isNull(num) || !isNumber(num)) {
				return undefined;
			}
			if (flag) {
				return Math.ceil(num);
			} else {
				return Math.floor(num);
			}
		},

		/*
		 * returns the absolute value of a value
		 */
		absolute : function(num) {
			if (isNull(num) || !isNumber(num)) {
				return undefined;
			}
			return Math.abs(num);
		}
	};

	window.BTTStringFunctions = bttString;
	window.BTTDateFunctions = bttDate;
	window.BTTNumberFunctions = bttNumber;

})();

}

if(!dojo._hasResource["com.ibm.btt.dijit.plugins.Pagination"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.plugins.Pagination"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit.plugins.Pagination");



dojo.declare("com.ibm.btt.dijit.plugins.Pagination", dojox.grid.enhanced._Plugin, {
	
	name : "bttpagination",
		
	mode : "simple",
	
	//requestURL : "Ajax",
	
	timeout : 500,
	
	keepSingleSelection : false,
	
	_paginateable : true,
	
	init: function(){
		this._initParams();
		this._createPaginators(this.option);		
		this._regApis();
		if (this.initialMode == "client") {
			if (this.mode == "simple") {
				this._requestFirstPage();
			} else {
				this.gotoPage("initial");
			}
		}
	},
	
	_initParams : function(){
		
		var _this = this;
		var fetchParam = function(paramName, defaultValue){
			return _this.option[paramName] != undefined ? _this.option[paramName]
					: (_this.grid[paramName]  != undefined ? _this.grid[paramName] : defaultValue);
		};
		var convertToNumber = function(arg, defaultValue){
			var tmp = Number(arg);
			if(isNaN(tmp)){
				return defaultValue;
			}else{
				return tmp;
			}
		};
		this.mode = fetchParam("mode", this.mode);
		this.timeout = convertToNumber(fetchParam("timeout", this.timeout), this.timeout);
		this.initialMode = fetchParam("initialMode", "server");
		this.totalRowNumber = fetchParam("totalRowNumber", this.totalRowNumber);
		this.rowsPerPage = fetchParam("rowsPerPage", this.rowsPerPage);
		//this.requestURL = fetchParam("requestURL", this.requestURL);
		this.bttParams = fetchParam("bttParams", {});
		if (this.mode == "simple") {
			this._setPageSize(this.totalRowNumber);
			this.defaultRows = fetchParam("defaultRows", 25);
			this._currentPage = 0;
			this.nls = dojo.i18n.getLocalization("dojox.grid.enhanced", "Pagination");
		}
		
		if (this.mode == "nonePageSize") {
			var parseBool = function(arg){
				if (arg == "false") {
					return false;
				} else if (arg == "true") {
					return true;
				} else {
					return arg;
				}
			};
			this.prevBtnEnabled = fetchParam("enablePrevious", false);
			this.prevBtnEnabled = parseBool(this.prevBtnEnabled);
			this.nextBtnEnabled = fetchParam("enableNext", true);
			this.nextBtnEnabled = parseBool(this.nextBtnEnabled);
		}
		
	},
	
	_setPageSize : function(totalRowNum){
		if(typeof(totalRowNum)!= "defined" && totalRowNum != null && totalRowNum!="null"){
			this.totalRowNumber = totalRowNum;
			this._maxSize = this.totalRowNumber;
			this.pageSize = this.rowsPerPage;
			this.totalPageSize = Math.ceil(this.totalRowNumber / this.rowsPerPage);
		}
	},
	
	_createPaginators: function(paginationArgs){
		// summary:
		//		Function to create the pagination control bar.
		this.paginators = [];
		if (this.mode == "simple") {
			if(paginationArgs.position === "both"){
				this.paginators = [
					new com.ibm.btt.dijit.plugins.SimplePaginator(dojo.mixin(paginationArgs, {position: "bottom", plugin: this})),
					new com.ibm.btt.dijit.plugins.SimplePaginator(dojo.mixin(paginationArgs, {position: "top", plugin: this}))
				];
			}else{
				this.paginators = [new com.ibm.btt.dijit.plugins.SimplePaginator(dojo.mixin(paginationArgs, {plugin: this}))];
			}
		} else if (this.mode == "nonePageSize") {
			if(paginationArgs.position === "both"){
				this.paginators = [
					new com.ibm.btt.dijit.plugins.NonePageSizePaginator(dojo.mixin(paginationArgs, {position: "bottom", plugin: this})),
					new com.ibm.btt.dijit.plugins.NonePageSizePaginator(dojo.mixin(paginationArgs, {position: "top", plugin: this}))
				];
			}else{
				this.paginators = [new com.ibm.btt.dijit.plugins.NonePageSizePaginator(dojo.mixin(paginationArgs, {plugin: this}))];
			}
		} else {
			console.error("Unsupport pagination mode, please check the parameter definition.");
		}
		
		
		dojo.forEach(this.paginators, function(f){
			f.update();
		});
	},
	 
	_stopEvent: function(event){
		try{
			dojo.stopEvent(event);
		}catch(e){}
	},
	
	_regApis: function(){
		var g = this.grid;
		g.gotoPage = dojo.hitch(this, this.gotoPage);
		g.nextPage = dojo.hitch(this, this.nextPage);
		g.prevPage = dojo.hitch(this, this.prevPage);
		g.gotoFirstPage = dojo.hitch(this, this.gotoFirstPage);
		g.gotoLastPage = dojo.hitch(this, this.gotoLastPage);
		g.getTotalRowCount = dojo.hitch(this, this.getTotalRowCount);
	},
	
	destroy: function(){
		this.inherited(arguments);
		var g = this.grid;
		try{
			dojo.forEach(this.paginators, function(p){
				p.destroy();
			});
			this.paginators = null;
		}catch(e){
			console.warn("Pagination.destroy() error: ", e);
		}
	},
		
	nextPage : function(e){
		if(this.mode == "simple"){
			this.gotoPage(this._currentPage + 2);
		}
		if(this.mode == "nonePageSize"){
			this.gotoPage("next");
		}
	},
	
	prevPage : function(e){
		if(this.mode == "simple"){
			this.gotoPage(this._currentPage);
		}
		if(this.mode == "nonePageSize"){
			this.gotoPage("prev");
		}
	},
	
	gotoFirstPage : function(e){
		this.gotoPage(1);
	},
	
	gotoLastPage : function(e){
		this.gotoPage(this.totalPageSize);
	},
	
	gotoPage : function(e){
		if (this._paginateable == true) {
			if (this.mode == "simple" && e >= 1 && e <= this.totalPageSize && e != (this._currentPage + 1)) {
				this._requestPageByNum(e);
				this._paginateable = false;
				dojo.forEach(this.paginators, function(p){
					p.disableBtns();
				});
			} 
			if (this.mode == "nonePageSize"
				&& ((e == "initial") || (e == "next" && this.nextBtnEnabled) || (e == "prev" && this.prevBtnEnabled)) && e != (this._currentPage + 1)) {
				this._fetchData({
					"pageRequest.pageEvent" : e,
					"mode" : this.mode
				});
				this._paginateable = false;
				dojo.forEach(this.paginators, function(p){
					p.disableBtns();
				});
			}
		}
	},
	
	_requestPageByNum : function(e){
		this._fetchData({
			"pageRequest.pageEvent" : "page",
			"pageRequest.pageNumber" : e,
			"mode" : this.mode
		});
		this._currentPage = e-1 ;
	},
	
	_requestFirstPage : function(){
		this._fetchData({
			"pageRequest.pageEvent" : "initial",
			"pageRequest.pageNumber" : 1,
			"mode" : this.mode
		});
		this._currentPage = 0 ;
	},
	
	_fetchData : function(arg){
		console.log(this.bttParams);
		/*var xhrParams = {
			url : this.requestURL,
			handleAs : "json",
			postData : dojo.toJson(dojo.mixin(this.bttParams, arg)),
			timeout : this.timeout,
			load : dojo.hitch(this, this._handleResponse),
			error : this._handleError
		};
		dojo.xhrPost(xhrParams);*/
		AjaxUtil.xhrPost({
			//url : this.requestURL,
			handleAs : "text",
			timeout : this.timeout,
			success : dojo.hitch(this, this._handleResponse),
			error : dojo.hitch(this, this._handleError)
		}, dojo.mixin(this.bttParams, arg));
	},
	
	_handleResponse : function(arg){
		try{
			var data = dojo.fromJson(arg);
			if(data.items){
				if(this.grid.get("store")){
					var tmpStore = this.grid.get("store");
					tmpStore.close();
				}
				this.grid.set("store",
					new dojo.data.ItemFileWriteStore({
						data : {
							items : data.items
						}
				}));
				this.grid._refresh();
				if (this.mode == "simple") {
					this._setPageSize(data.totalRowNumber);
				}
				if (this.mode == "nonePageSize") {
					if (typeof (data.enableNext) != "undefined") {

					}
					this.nextBtnEnabled = this._setBtnState(data.enableNext);
					this.prevBtnEnabled = this._setBtnState(data.enablePrevious);
				}
				dojo.forEach(this.paginators, function(p){
					p.update();
				});
			}
			// do not keep selection for single selection mode grid
			if(this.grid.selection.mode === "single" && !this.keepSingleSelection){
				this.grid.selection.deselectAll();
			}
			if(data && data.errMsg) this.grid.showErrorIcon(data.errMsg);
			this.grid.onAsyncOK(arguments);
		}catch(e){
			(new dijit.Dialog({
	            title: "",
	            content : arg
	        })).show();
			this.grid.onAsyncError(arguments);
		}

		this._paginateable = true;
				
	},
	
	_setBtnState : function(state) {
		if (typeof (state) != "undefined" && state != "null"
				&& state != null) {
			if (state == true || state == "true") {
				return true;
			} else {
				return false;
			}
		}
		return false;
	},
	
	_handleError : function(arg){
		console.error("An error occured when loading pagination data from " + AjaxUtil.ajaxOperationUrl);
		this._paginateable = true;
		if(arg.dojoType === "timeout") {
			this.grid.onAsyncTimeOut(arguments);
		} else if(arg.status !== undefined) {
			this.grid.onAsyncError(arguments);
		}
	},
	
	getTotalRowCount: function(){
		// summary:
		//		Function for get total row count
		return this._maxSize;
	}
});


dojo.declare("com.ibm.btt.dijit.plugins.SimplePaginator", [dojox.grid.enhanced.plugins._Paginator], {
	
	pageSizes : undefined,
	
	showAll : true,
	
	_updateDescription: function(){
		// summary:
		//		Update size information.
		/*if(this.description && this.descriptionDiv){
			this.descriptionDiv.innerHTML = this._maxItemSize > 0 ? dojo.string.substitute(this.descTemplate, [this.itemTitle, this._maxItemSize, 1, this.plugin.pageSize]) : "0 " + this.itemTitle;
		}
		if(this.descriptionWidth){
			dojo.style(this.descriptionTd, "width", this.descriptionWidth);
		}*/
	},
	
	disableBtns: function(){
		// summary:
		//		Update the style of the page step nodes
		var value = null,
			curPage = this._getCurrentPageNo(),
			pageCount = this._getPageCount(),
			visibleNodeLen = 0;
			
		var updateClass = function(node, isWardBtn, status){
			var value = node.value,
				enableClass = isWardBtn ? "dojoxGrid" + value + "Btn" : "dojoxGridNumBtnDisabled",
				disableClass = isWardBtn ? "dojoxGrid" + value + "BtnDisable" : "dojoxGridNumBtnDisabled";
			if(status){
				dojo.addClass(node, disableClass);
				dojo.attr(node, "tabindex", "-1");
			}else{
				dojo.addClass(node, enableClass);
				dojo.attr(node, "tabindex", "0");
			}
		};
		dojo.forEach(this.pageStepperDiv.childNodes, function(node){
			dojo.removeClass(node);
			if(isNaN(parseInt(node.value, 10))){
				dojo.addClass(node, "dojoxGridWardButton");
				var disablePageNum = node.value == "prevPage" || node.value == "firstPage" ? 1 : pageCount;
				updateClass(node, true, true);
			}else{
				value = parseInt(node.value, 10);
				updateClass(node, false, true);
			}
		}, this);
	}
	
});


dojo.declare("com.ibm.btt.dijit.plugins.NonePageSizePaginator", [dijit._Widget,dijit._Templated], {
	templateString:"<div dojoAttachPoint=\"paginatorBar\">\r\n\t<table cellpadding=\"0\" cellspacing=\"0\"  class=\"dojoxGridPaginator\">\r\n\t\t<tr>\r\n\t\t\t<td dojoAttachPoint=\"descriptionTd\" class=\"dojoxGridDescriptionTd\">\r\n\t\t\t\t<div dojoAttachPoint=\"descriptionDiv\" class=\"dojoxGridDescription\" />\r\n\t\t\t</td>\r\n\t\t\t<td dojoAttachPoint=\"sizeSwitchTd\"></td>\r\n\t\t\t<td dojoAttachPoint=\"pageStepperTd\" class=\"dojoxGridPaginatorFastStep\">\r\n\t\t\t\t<div dojoAttachPoint=\"pageStepperDiv\" class=\"dojoxGridPaginatorStep\"></div>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</table>\r\n</div>\r\n",
		
	// pagination bar position - "bottom"|"top"
	position: "bottom",
	
	// max data item size
	_maxItemSize: 10,
	
	// description message status params
	description: true,
	
	// fast step page status params
	pageStepper: "30em",
	
	constructor: function(params){
		dojo.mixin(this, params);
		this.grid = this.plugin.grid;
	},
	
	postCreate: function(){
		this.inherited(arguments);
		this._setWidthValue();
		var self = this;
		var g = this.grid;
		this.plugin.connect(g, "_resize", dojo.hitch(this, "_resetGridHeight"));
		this._originalResize = dojo.hitch(g, "resize");
		g.resize = function(changeSize, resultSize){
			self._changeSize = g._pendingChangeSize = changeSize;
			self._resultSize = g._pendingResultSize = resultSize;
			g.sizeChange();
		};
		this._placeSelf();
	},
	
	destroy: function(){
		this.inherited(arguments);
		this.grid.focus.removeArea("pagination" + this.position.toLowerCase());
		this.grid.resize = this._originalResize;
		this.pageSizes = null;
	},
	
	update: function(){
		this.nextBtnEnabled = this.plugin.nextBtnEnabled ? this.plugin.nextBtnEnabled : this.grid.nextBtnEnabled;
		this.prevBtnEnabled = this.plugin.prevBtnEnabled ? this.plugin.prevBtnEnabled : this.grid.prevBtnEnabled;
		this._updatePageStepper();
	},
	
	disableBtns : function(){
		var updateClass = function(node, isWardBtn, status){
			var value = node.value,
				enableClass = isWardBtn ? "dojoxGrid" + value + "Btn" : "dojoxGridInactived",
				disableClass = isWardBtn ? "dojoxGrid" + value + "BtnDisable" : "dojoxGridActived";
			if(status){
				dojo.addClass(node, disableClass);
				dojo.attr(node, "tabindex", "-1");
			}else{
				dojo.addClass(node, enableClass);
				dojo.attr(node, "tabindex", "0");
			}
		};
		dojo.forEach(this.pageStepperDiv.childNodes, function(node){
			dojo.removeClass(node);
			if(node.value=="prevPage"){
				dojo.addClass(node, "dojoxGridWardButton");
				updateClass(node, true, true);
			}
			if(node.value=="nextPage"){
				dojo.addClass(node, "dojoxGridWardButton");
				updateClass(node, true, true);
			}			
		}, this);
	},
	
	_setWidthValue: function(){
		var type = ["description", "sizeSwitch", "pageStepper"];
		var endWith = function(str1, str2){
			var reg = new RegExp(str2+"$");
			return reg.test(str1);
		};
		dojo.forEach(type, function(t){
			var width, flag = this[t];
			if(flag === undefined || typeof flag == "boolean"){
				return;
			}
			if(dojo.isString(flag)){
				width = endWith(flag, "px") || endWith(flag, "%") || endWith(flag, "em") ? flag : parseInt(flag, 10) > 0 ? parseInt(flag, 10) + "px" : null;
			}else if(typeof flag === "number" && flag > 0){
				width = flag + "px";
			}
			this[t] = width ? true : false;
			this[t + "Width"] = width;
		}, this);
	},
	
	_regFocusMgr: function(position){
		// summary:
		//		Function to register pagination bar to focus manager.
		this.grid.focus.addArea({
			name: "pagination" + position,
			onFocus: dojo.hitch(this, this._onFocusPaginator),
			onBlur: dojo.hitch(this, this._onBlurPaginator),
			onMove: dojo.hitch(this, this._moveFocus),
			onKeyDown: dojo.hitch(this, this._onKeyDown)
		});
		switch(position){
			case "top":
				this.grid.focus.placeArea("pagination" + position, "before", "header");
				break;
			case "bottom":
			default:
				this.grid.focus.placeArea("pagination" + position, "after", "content");
				break;
		}
	},
	
	_placeSelf: function(){
		// summary:
		//		Place pagination bar to a position.
		//		There are two options, top of the grid, bottom of the grid.
		var g = this.grid;
		var	position = dojo.trim(this.position.toLowerCase());
		switch(position){
			case "top":
				this.placeAt(g.viewsHeaderNode, "before");
				this._regFocusMgr("top");
				break;
			case "bottom":
			default:
				this.placeAt(g.viewsNode, "after");
				this._regFocusMgr("bottom");
				break;
		}
	},
	
	_resetGridHeight: function(changeSize, resultSize){
		// summary:
		//		Function of resize grid height to place this pagination bar.
		//		Since the grid would be able to add other element in its domNode, we have
		//		change the grid view size to place the pagination bar.
		//		This function will resize the grid viewsNode height, scorllboxNode height
		var g = this.grid;
		changeSize = changeSize || this._changeSize;
		resultSize = resultSize || this._resultSize;
		delete this._changeSize;
		delete this._resultSize;
		if(g._autoHeight){
			return;
		}
		var padBorder = g._getPadBorder().h;
		if(!this.plugin.gh){
			this.plugin.gh = dojo.contentBox(g.domNode).h + 2 * padBorder;
		}
		if(resultSize){
			changeSize = resultSize;
		}
		if(changeSize){
			this.plugin.gh = dojo.contentBox(g.domNode).h + 2 * padBorder;
		}
		var gh = this.plugin.gh,
			hh = g._getHeaderHeight(),
			ph = dojo.marginBox(this.domNode).h;
		ph = this.plugin.paginators[1] ? ph * 2 : ph;
		if(typeof g.autoHeight == "number"){
			var cgh = gh + ph - padBorder;
			dojo.style(g.domNode, "height", cgh + "px");
			dojo.style(g.viewsNode, "height", (cgh - ph - hh) + "px");
			
			this._styleMsgNode(hh, dojo.marginBox(g.viewsNode).w, cgh - ph - hh);
		}else{
			var h = gh - ph - hh - padBorder;
			dojo.style(g.viewsNode, "height", h + "px");
			var hasHScroller = dojo.some(g.views.views, function(v){
				return v.hasHScrollbar();
			});
			dojo.forEach(g.viewsNode.childNodes, function(c, idx){
				dojo.style(c, "height", h + "px");
			});
			dojo.forEach(g.views.views, function(v, idx){
				if(v.scrollboxNode){
					if(!v.hasHScrollbar() && hasHScroller){
						dojo.style(v.scrollboxNode, "height", (h - dojox.html.metrics.getScrollbar().h) + "px");
					}else{
						dojo.style(v.scrollboxNode, "height", h + "px");
					}
				}
			});
			this._styleMsgNode(hh, dojo.marginBox(g.viewsNode).w, h);
		}
	},
	
	_styleMsgNode: function(top, width, height){
		var messagesNode = this.grid.messagesNode;
		dojo.style(messagesNode, {"position": "absolute", "top": top + "px", "width": width + "px", "height": height + "px", "z-Index": "100"});
	},
	
	_updateDescription: function(){
		// summary:
		//		Update size information.
		/*var s = this.plugin.forcePageStoreLayer;
		if(this.description && this.descriptionDiv){
			this.descriptionDiv.innerHTML = this._maxItemSize > 0 ? dojo.string.substitute(this.descTemplate, [this.itemTitle, this._maxItemSize, s.startIdx + 1, s.endIdx + 1]) : "0 " + this.itemTitle;
		}
		if(this.descriptionWidth){
			dojo.style(this.descriptionTd, "width", this.descriptionWidth);
		}*/
	},
		
	_updatePageStepper: function(){
		// summary:
		//		Update the page step nodes
		if(!this.pageStepperTd){
			return;
		}
		if(this.pageStepperDiv.childNodes.length < 1){
			this._createWardBtns();
		}
		this._updatePageStepNodeClass();
	},
	
	_createWardBtns: function(){
		// summary:
		//		Create the previous/next/first/last button
		var self = this;
		var highContrastLabel = {prevPage: "&#60;", firstPage: "&#171;", nextPage: "&#62;", lastPage: "&#187;"};
		var createWardBtn = function(value, label, position){
			label = I18nUtil.getI18nString(label);
			var node = dojo.create("div", {value: value, title: label, tabindex: 1}, self.pageStepperDiv, position);
			self.plugin.connect(node, "onclick", dojo.hitch(self, "_onPageStep"));
			dijit.setWaiState(node, "label", label);
			// for high contrast
			var highConrastNode = dojo.create("span", {value: value, title: label, innerHTML: highContrastLabel[value]}, node, position);
			dojo.addClass(highConrastNode, "dojoxGridWardButtonInner");
		};
		createWardBtn("prevPage", "%com.ibm.btt.dijit.Grid/prevPageBtn", "first");
		createWardBtn("nextPage", "%com.ibm.btt.dijit.Grid/nextPageBtn", "last");
	},
	
	_updatePageStepNodeClass: function(){
		// summary:
		//		Update the style of the page step nodes
			
		var updateClass = function(node, isWardBtn, status){
			var value = node.value,
				enableClass = isWardBtn ? "dojoxGrid" + value + "Btn" : "dojoxGridInactived",
				disableClass = isWardBtn ? "dojoxGrid" + value + "BtnDisable" : "dojoxGridActived";
			if(status){
				dojo.addClass(node, disableClass);
				dojo.attr(node, "tabindex", "-1");
			}else{
				dojo.addClass(node, enableClass);
				dojo.attr(node, "tabindex", "0");
			}
		};
		dojo.forEach(this.pageStepperDiv.childNodes, function(node){
			dojo.removeClass(node);
			if(node.value=="prevPage"){
				dojo.addClass(node, "dojoxGridWardButton");
				if(this.prevBtnEnabled){
					updateClass(node, true, false);
				}else{
					updateClass(node, true, true);
				}
			}
			if(node.value=="nextPage"){
				dojo.addClass(node, "dojoxGridWardButton");
				if(this.nextBtnEnabled){
					updateClass(node, true, false);
				}else{
					updateClass(node, true, true);
				}
			}			
		}, this);
	},
		
	// ===== focus handlers ===== //
	_onFocusPaginator: function(event, step){
		// summary:
		//		Focus handler
		if(!this._currentFocusNode){
			if(step != 0){
				return this._onFocusPageStepNode(event);
			}else{
				return false;
			}
		}else{
			return false;
		}
	},
		
	_onFocusPageStepNode: function(event){
		// summary:
		//		Focus the page step area, if there is no focusable node, return false
		var pageStepNodes = this._getPageStepActivableNodes();
		if(event && event.type !== "click"){
			if(pageStepNodes[0]){
				dijit.focus(pageStepNodes[0]);
				this._currentFocusNode = pageStepNodes[0];
				this.focusArea = "pageStep";
				this.plugin._stopEvent(event);
				return true;
			}else{
				return false;
			}
		}
		if(event && event.type == "click"){
			if(dojo.indexOf(this._getPageStepActivableNodes(), event.target) > -1){
				this.focusArea = "pageStep";
				this.plugin._stopEvent(event);
				return true;
			}
		}
		return false;
	},
		
	_onBlurPaginator: function(event, step){
		var pageStepNodes = this._getPageStepActivableNodes();
		
		if(step > 0 && this.focusArea === "pageSize" && (pageStepNodes.length > 1 || this.gotoButton)){
			return false;
		}else if(step < 0 && this.focusArea === "pageStep"){
			return false;
		}
		this._currentFocusNode = null;
		this.focusArea = null;
		return true;
	},
	
	_onKeyDown: function(event, isBubble){
		// summary:
		//		Focus navigation
		if(isBubble){
			return;
		}
		if(event.altKey || event.metaKey){
			return;
		}
		var dk = dojo.keys;
		if(event.keyCode === dk.ENTER || event.keyCode === dk.SPACE){
			if(dojo.indexOf(this._getPageStepActivableNodes(), this._currentFocusNode) > -1){
				this._onPageStep(event);
			}
		}
		this.plugin._stopEvent(event);
	},
	
	_moveFocus: function(rowDelta, colDelta, evt){
		// summary:
		//		Move focus according row delta&column delta
		var nodes;
		if(this.focusArea == "pageStep"){
			nodes = this._getPageStepActivableNodes();
			if(this.gotoPageDiv){
				nodes.push(this.gotoPageDiv);
			}
		}
		if(nodes.length < 1){
			return;
		}
		var currentIdx = dojo.indexOf(nodes, this._currentFocusNode);
		var focusIdx = currentIdx + colDelta;
		if(focusIdx >= 0 && focusIdx < nodes.length){
			dijit.focus(nodes[focusIdx]);
			this._currentFocusNode = nodes[focusIdx];
		}
		this.plugin._stopEvent(evt);
	},
		
	_getPageStepActivableNodes: function(){
		return (dojo.query("div[tabindex='0']", this.pageStepperDiv));
	},
		
	_getAllPageStepNodes: function(){
		var nodeList = [];
		for(var i = 0, len = this.pageStepperDiv.childNodes.length; i < len; i++){
			nodeList.push(this.pageStepperDiv.childNodes[i]);
		}
		return nodeList;
	},
	
	_onPageStep: function(/*Event*/e){
		// summary:
		//		The handler jump page event
		var g = this.grid;
		
		if(!this._currentFocusNode){
			this.grid.focus.currentArea("pagination" + this.position);
		}
		if(this.focusArea != "pageStep"){
			this.focusArea = "pageStep";
		}
		
		switch(e.target.value){
			case "prevPage":
				if(e.target.className.indexOf("dojoxGridprevPageBtnDisable") <= 0 ) g.prevPage();
				break;
			case "nextPage":
				if(e.target.className.indexOf("dojoxGridnextPageBtnDisable") <= 0 )	g.nextPage();
				break;
		}
	}

});

dojox.grid.EnhancedGrid.registerPlugin(com.ibm.btt.dijit.plugins.Pagination/*name:'bttpagination'*/);

}

if(!dojo._hasResource["com.ibm.btt.dijit.Dialog"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.Dialog"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
*/

dojo.provide("com.ibm.btt.dijit.Dialog"); 


 

dojo.declare("com.ibm.btt.dijit.Dialog",[ dijit.Dialog,com.ibm.btt.dijit.AbstractWidgetMixin] ,{ 
	
	closable : false,
	
	/**
	 * 
	 * hook method for close attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setClosableAttr : function(value){
		this.closable = value;
		if(this.closable){
			dojo.style(this.closeButtonNode, "display", "");
		}else{
			dojo.style(this.closeButtonNode, "display", "none");
		}
	},
	
	_onKey: function(/*Event*/ evt){
		// summary:
		//		Handles the keyboard events for accessibility reasons
		// tags:
		//		private

		if(evt.charOrCode){
			var dk = dojo.keys;
			var node = evt.target;
			if(evt.charOrCode === dk.TAB){
				this._getFocusItems(this.domNode);
			}
			var singleFocusItem = (this._firstFocusItem == this._lastFocusItem);
			// see if we are shift-tabbing from first focusable item on dialog
			if(node == this._firstFocusItem && evt.shiftKey && evt.charOrCode === dk.TAB){
				if(!singleFocusItem){
					dijit.focus(this._lastFocusItem); // send focus to last item in dialog
				}
				dojo.stopEvent(evt);
			}else if(node == this._lastFocusItem && evt.charOrCode === dk.TAB && !evt.shiftKey){
				if(!singleFocusItem){
					dijit.focus(this._firstFocusItem); // send focus to first item in dialog
				}
				dojo.stopEvent(evt);
			}else{
				// see if the key is for the dialog
				while(node){
					if(node == this.domNode || dojo.hasClass(node, "dijitPopup")){
						if(evt.charOrCode == dk.ESCAPE && this.closable){
							this.onCancel();
						}else{
							return; // just let it go
						}
					}
					node = node.parentNode;
				}
				// this key is for the disabled document window
				if(evt.charOrCode !== dk.TAB){ // allow tabbing into the dialog for a11y
					dojo.stopEvent(evt);
				// opera won't tab to a div
				}else if(!dojo.isOpera){
					try{
						this._firstFocusItem.focus();
					}catch(e){ /*squelch*/ }
				}
			}
		}
	}

}); 

}

if(!dojo._hasResource["com.ibm.btt.dijit.ScreenCover"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.dijit.ScreenCover"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
 */

dojo.provide("com.ibm.btt.dijit.ScreenCover");





dojo.declare("com.ibm.btt.dijit.ScreenCover", [ dijit._Widget,
		dijit._Templated, com.ibm.btt.dijit.AbstractWidgetMixin ], {

	templateString : "<div class='dijitScreenCover' style='display:none;'><div dojoAttachPoint='containerNode' class='dijitScreenCoverContainer'><div dojoAttachPoint='imageNode' class='dijitScreenCoverImage'></div><div dojoAttachPoint='textNode' class='dijitScreenCoverText'></div></div></div>",

	text : "%com.ibm.btt.dijit.ScreenCover/waitingText",
	
	postCreate : function(){
		this.inherited(arguments);
		dojo.body().appendChild(this.domNode);
		this.domNode.style.display = "none";
		this._events = [];
		this._events.push(dojo.connect(dojo.global, "onresize", this, this.layout));
	},
	
	/**
	 * 
	 * Calculate the size and position of screen to make sure this widget will cover the whole screen 
	 * 
	 * @tag public
	 * 
	 * */
	layout : function() {
		var viewport = dojo.window.getBox();
		var bb = dojo._getBorderBox(this.containerNode);
		var l = Math.floor(viewport.l + (viewport.w - bb.w) / 2);
		var t = Math.floor(viewport.t + (viewport.h - bb.h) / 2);
		
		dojo.style(this.domNode,{
			top : viewport.t + "px",
			left : viewport.l + "px",
			width : viewport.w + "px",
			height : viewport.h + "px"
		});
		dojo.style(this.containerNode,{
			left: l + "px",
			top: t + "px"
		});

	},

	/**
	 * 
	 * hook method for text attribute
	 * 
	 * @tag private this is a internal method, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_setTextAttr : function(value){
		this.text = value;
		this.textNode.innerHTML = this.getI18NString(value);
	},
	
	/**
	 * 
	 * This method is used to show the screenCover to cover whole screen and block user operation 
	 * 
	 * @tag public
	 * 
	 * */
	show : function() {
		this.domNode.style.display = "block";
		this.layout();
	},

	/**
	 * 
	 * hide the shown cover
	 * 
	 * @tag public
	 * 
	 * */
	hide : function() {
		this.domNode.style.display = "none";
	},
	
	destroy : function(){
		this.inherited(arguments);
		while (this._events.length > 0) {
			dojo.disconnect(this._events.pop());
		}
	}
});

}

if(!dojo._hasResource["com.ibm.btt.event.NavigationEngine"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["com.ibm.btt.event.NavigationEngine"] = true;
/*
 * Licensed Materials - Property of IBM
 * Restricted Materials of IBM
 * 5724-H82
 * (C) Copyright IBM Corp.2010 All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp
 */

dojo.provide("com.ibm.btt.event.NavigationEngine");






dojo.declare("com.ibm.btt.event.NavigationEngine", [ com.ibm.btt.event.Engine ], {

	
	url : "Request",
	
	/**
	 * An object used to save the registered command type and handler
	 * 
	 * @tag private this is a internal attribute, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_commandMap : {},

	/**
	 * reference of contentpane which is used to render the page return in ajax response
	 * 
	 * @tag private this is a internal attribute, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_contentPane : null,

	/**
	 * reference dialog which is used to render the page return in ajax response
	 * 
	 * @tag private this is a internal attribute, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_dialog : null,
	
	/**
	 * reference screen cover which is used to cover the screen and block user input during the ajax request
	 * 
	 * @tag private this is a internal attribute, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_cover : null,

	constructor : function() {
		var _this = this;
		
		if(dojo._postLoad){
			this.postCreate();
			this.onLoad();
		}else{
			dojo.addOnLoad(function() {
				_this.postCreate();
				_this.onLoad();
			});
		}
	},

	postCreate : function() {
		this.registerCommand("render_page", dojo.hitch(this, this.renderPageHandler));
		this.registerCommand("popup_page", dojo.hitch(this, this.popupPageHandler));
		this.registerCommand("redirect", dojo.hitch(this, this.redirectPage));
		this.registerCommand("remote_flow", dojo.hitch(this, this.remoteFlowHandler));
		this.registerCommand("do_nothing", function(){console.info("do nothing is returned from server side.");});
	},

	onLoad : function(e) {
		this._delegateAllFormSubmit();
		dojo.forEach(
			dojo.filter(dojo.query('form'), function(form){ 
				return form.title && form.title != ""; 
			} ),
			function(form){
				eval(form.title);
			}
		);
		this._getCover().hide();
	},

	setUrl : function(value){
		this.url = value;
	},
	
	registerCommand : function(type, handler) {
		this._commandMap[type] = handler;
	},

	/**
	 * get all widget under specified dome node
	 * 
	 * @tag private this is a internal attribute, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_queryAllWidgets : function(node) {
		if (!node) {
			node = dojo.body();
		}
		return dojo.query('[widgetId]', node).map(dijit.byNode);
	},
	
	/**
	 * destroy all dijit instance in cuerrent page
	 * 
	 * @tag private this is a internal attribute, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_disposeAllWidgets : function() {
		this.clearRules();
		
		if (this._contentPane) {
			this._destroyContentPane();
			this._destroyDialog();
		} else {
			this._destroyDialog();
			this._destroyCover();
			var nodes = this._queryAllWidgets();
			nodes.forEach(function(widget) {
				try{
					widget.destroy();
				}catch(e){
					//do nothing, just in case there is a exception thrown out while destroying the widgets
					console.error("An error occured, while destroying the widget. Error:" + e);
				}
			});
			dojo.empty(dojo.body());
			dijit._masterTT = undefined;
		}
	},

	/**
	 * release event handlers created by dojo.connect
	 * 
	 * @tag private this is a internal attribute, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_unregisterEvents : function(arg, flag) {
		if (flag) {
			while (arg.length > 0) {
				dojo.disconnect(arg.pop());
			}
		} else {
			dojo.disconnect(arg);
		}
	},
	
	/**
	 * Take over all form submission request by engine
	 * 
	 * @tag private this is a internal attribute, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_delegateAllFormSubmit : function() {
		var _this = this;
		
		dojo.forEach(this._queryAllWidgets(), function(widget) {
				
			if(widget.type != "undefined" && (
					widget.type == "save" || widget.type == "cancel")){
				var btnClick = widget._onButtonClick;
				widget._onButtonClick = dojo.hitch(_this, _this._onButtonClick, widget, btnClick);
			}
			
			if(widget.domNode.nodeName === "A" ){
				widget.onClick = dojo.hitch(_this, _this._onLinkClick, widget);
			}
			
			if(widget.domNode.nodeName === "FORM"){				
				widget.onSubmit = dojo.hitch(widget, function(e) {
					if(e){
						if(e.preventDefault){
							e.preventDefault();
						}
						dojo.stopEvent(e);
					}
					if(widget.validateOnSubmit) {
						if(!widget.isValid() || !widget.xValid) return false;
					}
					dojo.forEach(widget.getDescendants(), function(widget){
						if(widget.onFormSubmit) {
							try{
								widget.onFormSubmit();
							}catch(e){
								console.error("Error occured while excuting the onFormSubmit events before form submitted.");
							}
						}
					});	
					var button = widget._querySubmitButton(e);
					if (widget.onFormSubmit) {
						widget.onFormSubmit();
					}
					_this._submitFormData(widget, button);
					return false;
				});
			}
		});
		
	},
	
	/**
	 * 
	 * handle the default like click behavior replace with ajax by engine 
	 * 
	 * @tag private this is a internal attribute, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_onLinkClick : function(link, e){
		if (link.get("target") !== "_blank") {
			e.preventDefault();
			if (link.bttParams) {
				this._submitData(dojo.fromJson(link.bttParams));
			}
		}
	},
	
	/**
	 * 
	 * override the default button click event to take over and submit the request 
	 * with ajax to support "save" and "cancel" type button
	 * 
	 * @tag private this is a internal attribute, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_onButtonClick : function(button, btnClickMethod, e){
		if (button.type == "save" && button.get("disabled") == false) {
			button._onClick(e);
			e.preventDefault();
			var form = button._getParentForm();
			if(form && button.bttParams){
				if (form.onFormSubmit) {
					form.onFormSubmit();
				}
				this._submitData(dojo.mixin(form.get('validValue'), dojo.fromJson(button.bttParams)));
			}
		} else if (button.type == "cancel" && button.get("disabled") == false) {
			button._onClick(e);
			e.preventDefault();
			if(button.bttParams){
				this._submitData(dojo.fromJson(button.bttParams));
			}
		} else {
			btnClickMethod.apply(button, [e]);
		}
	},
	
	/**
	 * 
	 * submit for form request with ajax
	 * 
	 * @tag private this is a internal attribute, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_submitFormData : function(form, button) {
		if(button && button.bttParams){
			var x = dojo.mixin(form.get('value'), dojo.fromJson(button.bttParams));
			x.dse_errorPage = form.bttErrorPage? form.bttErrorPage : null;
			this._submitData(x);
		}else if(form.bttParams){
			var x = dojo.mixin(form.get('value'), dojo.fromJson(form.bttParams));
			x.dse_errorPage = form.bttErrorPage? form.bttErrorPage : null;
			this._submitData(x);
		}else{
			console.log("Do not find default BTT Params on form for user press enter operation.");
		}
	},

	/**
	 * send ajax request to btt service
	 * 
	 * @tag private this is a internal attribute, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_submitData : function(data){
		AjaxUtil.xhrPost( {
			headers : {
				'requesttype':'ajax'
			},
			url : this.url,
			handleAs : "json",
			success : dojo.hitch(this, this._handleFormResponse),
			error : dojo.hitch(this, this._handleError)
		}, data);
		this._getCover().show();
	},
	
	/**
	 * error handler if error occured
	 * 
	 * @tag private this is a internal attribute, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_handleError : function(e, xhr){
		var displayMsg;
		if(xhr){
			//xhr is not null, this error comes from Ajax 
			//maybe it is a http 404 or 500 error 
			//need to check and display the error page if the there is an error page in the response JSON
			var response = xhr.xhr.responseText;
			if (response && response != "") {
				try{
					response = dojo.fromJson(response);
					if (response["page"]) {
						displayMsg = response["page"];
					} 
				}catch(e){
					displayMsg = response;
				}
			} 
		}
		
		if(!displayMsg){
			if (e.message) {
				displayMsg = e.message;
			} else {
				displayMsg = "An error occured. Messsage : " + e;
			}
		}
		
		this._disposeAllWidgets();

		dojo.body().innerHTML = displayMsg;
		
		this._getCover().hide();
	},
	
	/**
	 * 
	 * handler for form data request response
	 * 
	 * @tag private this is a internal attribute, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_handleFormResponse : function(e) {
		var closeCover;
		if (this._commandMap[e["command"]]) {
			try{
				closeCover = this._commandMap[e["command"]](e);
			}catch(e){
				this._handleError('An error occured while excuting the handler:'
					+ e["dse_clientCommand"] + ' error:' + e);
			}
		} else {
			this._handleError('Can not find corresponding command handler for command type=\''
									+ e["dse_clientCommand"] + '\'');
		}
		
		/*if(e && e["command"] == "remote_flow"){
			// do nothing before remote flow loaded at onLoad().
		}else{*/
			
		/*}*/
		if (closeCover !== false) {
			this._getCover().hide();
		} 
	},

	createContentPane : function(){
		return new com.ibm.btt.dijit.ContentPane({'style':'padding:0px;',refreshOnShow: false}, dojo.create("div", null, dojo.body(),"last"));
	},
	
	/**
	 * 
	 * singleton method to get a contentpane instance
	 * 
	 * @tag private this is a internal attribute, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_getContentPane : function(data){
		if(!this._contentPane){
			this._contentPane = this.createContentPane();
		}
		if(this._cpOnLoadEvt){
			this._unregisterEvents(this._cpOnLoadEvt);
		}
		if(this._cpOnErrorEvt){
			this._unregisterEvents(this._cpOnErrorEvt);
		}
		this._cpOnErrorEvt = dojo.connect(
			this._contentPane, 
			'onContentError',
			this, 
			dojo.hitch(this, this._afterPageLoaded, data, this._contentPane)
		);
		this._cpOnLoadEvt = dojo.connect(
			this._contentPane, 
			'onLoad',
			this, 
			dojo.hitch(this, this._afterPageLoaded, data, this._contentPane)
		);
		return this._contentPane;
	},
	
	/**
	 * 
	 * destroy the contentpane instance
	 * 
	 * @tag private this is a internal attribute, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_destroyContentPane : function(){
		if(this._contentPane){
			this._unregisterEvents(this._cpOnLoadEvt);
			this._cpOnLoadEvt = undefined;
			this._unregisterEvents(this._cpOnErrorEvt);
			this._cpOnErrorEvt = undefined;
			try{
				this._contentPane.destroyDescendants();
				this._contentPane.destroy();
			}catch(e){
				//do nothing just in case there is a exception thrown out when destroy the contentpane.
			}
			this._contentPane = undefined;
		}
	},
	
	createDialog : function(){
		var viewport = dojo.window.getBox();
		return new com.ibm.btt.dijit.Dialog( {
			title : "",
			style : "overflow-y:auto;overflow-x:auto;max-width:"
									+ viewport.w + "px;max-height:"
									+ viewport.h + "px",
			closable : false
		});
	},
	
	/**
	 * singleton method to get the dialog instance
	 * 
	 * @tag private this is a internal attribute, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_getDialog : function(data){
		if (!this._dialog) {
			var viewport = dojo.window.getBox();
			this._dialog = this.createDialog();
		}
		if(this._dialogOnLoadEvt){
			this._unregisterEvents(this._dialogOnLoadEvt);
		}
		this._dialogOnLoadEvt = dojo.connect(
			this._dialog, 
			'onLoad',
			this, 
			dojo.hitch(this, this._afterPageLoaded, data, this._dialog)
		);
		return this._dialog;
	},
	
	/**
	 * 
	 * destroy the dialog instance
	 * 
	 * @tag private this is a internal attribute, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_destroyDialog : function(){
		if (this._dialog) {
			this._unregisterEvents(this._dialogOnLoadEvt);
			this._dialogOnLoadEvt = undefined;
			this._dialog.hide();
			try{
				this._dialog.destroyDescendants();
				this._dialog.destroy();
			}catch(e){
				//do nothing just in case there is a exception thrown out when destroy the dialog.
			}
			this._dialog = undefined;
		}
	},
	
	/**
	 * 
	 * singleton method to get a cover instance
	 * 
	 * @tag private this is a internal attribute, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_getCover : function(){
		if(!this._cover){
			this._cover = new com.ibm.btt.dijit.ScreenCover();
		}
		return this._cover;
	},
	
	/**
	 * destroy the cover instance
	 * 
	 * @tag private this is a internal attribute, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_destroyCover : function(){
		if(this._cover){
			this._cover.destroy();
			this._cover = undefined;
		}
	},
	
	isECARuleFile : function(src, fileName) {
		var endWith = function(src, oString) {
			var reg = new RegExp(oString + "$");
			return reg.test(src);
		};
		return endWith(src, fileName + ".js");
	},
	
	/**
	 * 
	 * parse and load the ECA js after page is loaded
	 * 
	 * @tag private this is a internal attribute, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_afterPageLoaded : function(data, container){
		
		if(data["page_name"]){
			var _this = this;
			dojo.query("script", container.domNode).forEach(dojo.hitch(this, function(script) {
				if (script.src && this.isECARuleFile(script.src, data["page_name"])) {
					_this._registerECAEvent(data["page_name"], script.src);
				}
			}));
		}
		
		this.onLoad(data, container);
		
	},
	
	/**
	 * get the ECA js file with ajax request
	 * 
	 * @tag private this is a internal attribute, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_registerECAEvent : function(name, url){
		var xhrArg = {
			url : url,
			handleAs : "text",
			load : dojo.hitch(this, function(e) {
				dojo.eval(e);
				if (window[name]) {
					//this.registerRules(window[name]);
					delete window[name];
				}
			})
		};
		dojo.xhrGet(xhrArg);
	},
	
	/**
	 * parse and generate the next page url for option1
	 * 
	 * @tag private this is a internal attribute, may be changed or removed in later version
	 *              please do not use this method in customer code.
	 * */
	_parsenextPageUrl: function(e) {
		var data = dojo.fromJson(e.data);
		var url = [ "Request?dse_applicationId=" + data["dse_applicationId"] ];
		url.push("dse_processorId=" + data["dse_processorId"]);
		url.push("dse_sessionId=" + data["dse_sessionId"]);
		url.push("dse_processorState=" + data["dse_processorState"]);
		url.push("dse_nextEventName=" + data["dse_nextEventName"]);
		url.push("dse_operationName=" + data["dse_operationName"]);
		url.push("dse_pageId=" + data["dse_pageId"]);
		return url.join("&");
	},
	
	redirectPage : function(e){
		location.href = this._parsenextPageUrl(e);
	},

	popupPageHandler : function(data) {
		var dialog = this._getDialog(data);
		dialog.destroyDescendants();		
		dialog.startup();
		if (!dialog.get('open')) {
			dialog.show();			
		}
		
		// fix for Firefox 3.6.*, the dojo in ContentPane breaks page rendering
		var page = dojo.isFF < 4?data["page"].replace('src="js/dojo/dojo_BTT.js"', ''): data["page"];
		
		dialog.set('content', page);
	},

	renderPageHandler : function(data) {
		this._getCover().show();
		
		this._disposeAllWidgets();
		if(this._dialog && this._dialog.get('open')){
			this._dialog.hide();
		}
		var contentPane = this._getContentPane(data);	
		
		// fix for Firefox 3.6.*, the dojo in ContentPane breaks page rendering
		var page = dojo.isFF < 4?data["page"].replace('src="js/dojo/dojo_BTT.js"', ''): data["page"];
		
		contentPane.set('content', page);		
		contentPane.startup();
	},
	
	remoteFlowHandler: function(data) {
		this._getCover().show();
		
		var submit_data = dojo.fromJson(data["data"]);
		console.info("############ remoteFlowHandler : ",submit_data );
	 
		if (submit_data.dse_remoteFlowID) {
			this.url= submit_data.dse_RemoteRequest_URL ; // requst URL of remote flow transactions
			AjaxUtil.ajaxOperationUrl = submit_data.dse_RemoteAjaxOp_URL;
		}			
		else {
			this.url = submit_data.dse_RemoteSubFlow_URL;  //  requst URL parent flow transactions
			AjaxUtil.ajaxOperationUrl = submit_data.dse_remote_parent_AjaxURL;
		}
		
		AjaxUtil.xhrPost( {
			headers : {
				'requesttype':'ajax'
			},
			url : submit_data.dse_RemoteSubFlow_URL,  // URL of starting remoteFlow or restoring parent flow
			handleAs : "json",
			success : dojo.hitch(this, this._handleFormResponse),
			error : dojo.hitch(this, this._handleError)
		}, submit_data);
		 
		return false;
	},

	destroy : function(){
		this.inherited(arguments);
		this._commandMap = undefined;
		this._destroyContentPane();
		this._destroyCover();
		this._destroyDialog();
	}
});

}

