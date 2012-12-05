<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<jsp:useBean id="utb" scope="page" class="com.ibm.btt.cs.html.DSEJspContextServices">
	<%
		utb.initialize(request);			  
	%>
</jsp:useBean>	
<html>
<!-- Generated from EditableTableIsManipulated.xui by ghost, on Wed Dec 05 18:57:02 CST 2012 -->
<head>
<%@ taglib uri="/WEB-INF/bttdojo.tld" prefix="bttdojo"%>
<%@ page import="com.ibm.btt.cs.html.JSPUtil" %> 
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<style type="text/css">
@import "js/dojo/resources/dojo.css";
@import "js/dijit/themes/claro/claro.css";		
@import "js/dojox/grid/enhanced/resources/claro/EnhancedGrid.css";
@import "css/dijit/message.css";
@import "js/com/ibm/btt/dijit/templates/FileUpload.css";
@import "js/dijit/themes/claro/document.css";
@import "js/com/ibm/btt/dijit/templates/Grid.css";
@import "js/com/ibm/btt/dijit/templates/ScreenCover.css";
@import "js/com/ibm/btt/dijit/templates/Group.css";
@import "js/com/ibm/btt/dijit/templates/Label.css";
@import "css/dijit/main.css";

.dojoxGrid table { margin: 0; }
.dj_gecko .dijitTextBoxReadOnly INPUT.dijitInputInner {
    -moz-user-input: auto;
}
.dj_gecko .dijitTextBoxReadOnlyFocused INPUT.dijitInputInner {
	-moz-user-input: none;
}
</style>
<script>
	var djConfig =  {
		baseUrl:"js/dojo/",
		<bttdojo:locale/>,
		isDebug: true, 
		parseOnLoad: true
	};
</script>
<script type="text/javascript" src="js/dojo/dojo_BTT.js"></script>
<script type="text/javascript" src="js/com/ibm/btt/btt.js"></script>
<script type="text/javascript" >
dojo.addOnLoad(function(){
	dojo.style(document.body, "visibility", "");
});
</script>

<script type="text/javascript">
	if(!window.engine){
		<%if(utb.ajaxNavigationEnabled()){%>
			window.engine = new com.ibm.btt.event.NavigationEngine();
		<%}else{%>
			window.engine = new com.ibm.btt.event.Engine();
		<%}%>
		engine.setMonitor(new com.ibm.btt.event.BaseMonitor());
		engine.registerCond("js/condition/condition.js");
	}
</script>
</head>
<body class="claro" style="visibility:hidden">
<script type="text/javascript" src="<%=JSPUtil.getWebContextRootUrl()%>jsp/EditableTablePage/EditableTableIsManipulated.js"> </script>
  <table id="EditableTableIsManipulated_panel">
    <tr>
      <td align="left" valign="top">
        <bttdojo:form id="EditableTableIsManipulated_form" errorPage="EditableTablePage/EditableTableIsManipulated.jsp">
          <table>
            <tr>
              <td align="left" valign="top">
                  <table id="EditableTableIsManipulated_panel03">
                    <tr>
                      <td align="left" valign="center">
                        <bttdojo:a id="EditableTableIsManipulated_link_copy" text="editable table" flowEvent="returnToEditable"/>
                      </td>
                      <td align="left" valign="center">
                        <bttdojo:label id="EditableTableIsManipulated_label" text=" -> manipulate editable table"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td align="left" valign="top">
                  <table id="EditableTableIsManipulated_panel01">
                    <tr>
                      <td align="left" valign="center">
                        <bttdojo:label id="EditableTableIsManipulated_label01" text="Sort and columReorder"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td align="left" valign="center">
                <bttdojo:table id="EditableTableIsManipulated_table" dataName="selectAccountList" dataNameForList="EditableAccountList" sortEnabled="true" columnReordering="true" selectionMode="multiple" selectionRequired="true" isPageable="false">
                  <bttdojo:column widget="TextBox" align="left" dataName="AccountName" width="80" type="String" text="%nls.testtable/AccountName"/>
                  <bttdojo:column widget="Select" align="left" dataName="TradeTime" width="80" text="%nls.testtable/TradeTime" storeURL="listFiles/tradeTimeForSelect.js"/>
                  <bttdojo:column align="left" dataName="TradeTime" width="80" text="%nls.testtable/TradeTimeValue"/>
                  <bttdojo:column dataNameForList="AccountTypeForSelect" widget="Select" align="left" dataName="AccountType" width="80" labelField="labelField" valueField="valueField" text="%nls.testtable/AccountType"/>
                  <bttdojo:column align="left" dataName="AccountType" width="80" text="%nls.testtable/AccountTypeValue"/>
                  <bttdojo:column pattern="yyyy-MM-dd" widget="TextBox" align="left" dataName="AccountOpeningDate" width="100" type="Date" text="%nls.testtable/AccountOpeningDate"/>
                  <bttdojo:column currency="EUR" numberType="bigDecimal" widget="TextBox" align="left" dataName="AccountBlance" width="80" type="Currency" text="%nls.testtable/AccountBlance"/>
                  <bttdojo:column widget="ComboBox" align="left" dataName="Rate" width="80" text="%nls.testtable/Rate" storeURL="listFiles/rateForCombo.js"/>
                  <bttdojo:column dataNameForList="LocaltionForComboBox" widget="ComboBox" align="left" dataName="Localtion" width="80" labelField="labelField" text="%nls.testtable/Localtion"/>
                  <bttdojo:column unCheckedValue="false" widget="CheckBox" align="left" dataName="Usable" width="80" checkedValue="true" text="%nls.testtable/Usable"/>
                  <bttdojo:column widget="LabelFromList" align="left" dataName="accountAttribution" width="80" text="%nls.testtable/accountAttribution" storeURL="listFiles/accountAttribution.js"/>
                  <bttdojo:column widget="Image" align="left" dataName="ImageField" width="80" text="%nls.testtable/Image"/>
                </bttdojo:table>
              </td>
            </tr>
            <tr>
              <td align="left" valign="top">
                  <table id="EditableTableIsManipulated_visibility">
                    <tr>
                      <td align="left" valign="center">
                        <bttdojo:button id="EditableTableIsManipulated_visible" type="button" text="visible"/>
                      </td>
                      <td align="left" valign="center">
                        <bttdojo:button id="EditableTableIsManipulated_hidden" type="button" text="hidden"/>
                      </td>
                      <td align="left" valign="center">
                        <bttdojo:button id="EditableTableIsManipulated_gone" type="button" text="gone"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td align="left" valign="top">
                  <table id="EditableTableIsManipulated_disabled">
                    <tr>
                      <td align="left" valign="center">
                        <bttdojo:label id="EditableTableIsManipulated_label02" text="disabled:"/>
                      </td>
                      <td align="left" valign="center">
                        <bttdojo:button id="EditableTableIsManipulated_disabletrue" type="button" text=" true"/>
                      </td>
                      <td align="left" valign="center">
                        <bttdojo:button id="EditableTableIsManipulated_disablefalse" type="button" text="false"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td align="left" valign="top">
                  <table id="EditableTableIsManipulated_readonly">
                    <tr>
                      <td align="left" valign="center">
                        <bttdojo:label id="EditableTableIsManipulated_readonlylabel" text="read only:"/>
                      </td>
                      <td align="left" valign="center">
                        <bttdojo:button id="EditableTableIsManipulated_readonlytrue" type="button" text="true"/>
                      </td>
                      <td align="left" valign="center">
                        <bttdojo:button id="EditableTableIsManipulated_readonlyfalse" type="button" text="false"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td>
                  <table id="EditableTableIsManipulated_panel02">
                    <tr>
                      <td align="left" valign="center">
                        <bttdojo:button id="EditableTableIsManipulated_To group popup page" type="submit" text="To group popup page" flowEvent="to group popup page"/>
                      </td>
                      <td align="left" valign="center">
                        <bttdojo:button id="EditableTableIsManipulated_To pane popup page" type="submit" text="To pane popup page" flowEvent="to pane popup page"/>
                      </td>
                      <td align="left" valign="center">
                        <bttdojo:button id="EditableTableIsManipulated_button" type="submit" text="To group page" flowEvent="to group page"/>
                      </td>
                      <td align="left" valign="center">
                        <bttdojo:button id="EditableTableIsManipulated_button01" type="submit" text="To pane page" flowEvent="to pane page"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td align="left" valign="top">
                  <table id="EditableTableIsManipulated_panel04">
                    <tr>
                      <td align="left" valign="center">
                        <bttdojo:button id="EditableTableIsManipulated_Change the hint from text" type="button" text="Change the hint from text"/>
                      </td>
                      <td align="left" valign="center">
                        <bttdojo:button id="EditableTableIsManipulated_Change the hint from NLS" type="button" text="Change the hint from NLS"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td align="left" valign="center">
                <bttdojo:button id="EditableTableIsManipulated_Change the CSS" type="button" text="Change the CSS"/>
              </td>
            </tr>
          </table>
        </bttdojo:form>
      </td>
    </tr>
  </table>

</body>
</html>