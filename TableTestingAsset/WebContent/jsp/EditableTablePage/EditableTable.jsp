<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<jsp:useBean id="utb" scope="page" class="com.ibm.btt.cs.html.DSEJspContextServices">
	<%
		utb.initialize(request);			  
	%>
</jsp:useBean>	
<html>
<!-- Generated from EditableTable.xui by ghost, on Sat Sep 15 17:17:38 CST 2012 -->
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
  <table id="EditableTable_panel">
    <tr>
      <td valign="top">
        <bttdojo:form id="EditableTable_form" errorPage="EditableTablePage/EditableTable.jsp">
          <table id="EditableTable_form">
            <tr>
              <td>
                <bttdojo:label id="EditableTable_label" text="editable table"/>
              </td>
            </tr>
            <tr>
              <td>
                <bttdojo:table id="EditableTable_table" dataName="selectAccountList" dataNameForList="EditableAccountList" selectionMode="multiple" selectionRequired="true" isPageable="false">
                  <bttdojo:column widget="TextBox" align="left" dataName="AccountName" width="80" type="String" text="%nls.testtable/AccountName"/>
                  <bttdojo:column widget="Select" align="left" dataName="TradeTime" width="80" text="%nls.testtable/TradeTime" storeURL="listFiles/tradeTimeForSelect.js"/>
                  <bttdojo:column align="left" dataName="TradeTime" width="80" text="%nls.testtable/TradeTimeValue"/>
                  <bttdojo:column dataNameForList="AccountTypeForSelect" widget="Select" align="left" dataName="AccountType" width="80" labelField="labelField" valueField="valueField" text="%nls.testtable/AccountType"/>
                  <bttdojo:column align="left" dataName="AccountType" width="80" text="%nls.testtable/AccountTypeValue"/>
                  <bttdojo:column pattern="yyyy-MM-dd" widget="TextBox" align="left" dataName="AccountOpeningDate" width="100" type="Date" text="%nls.testtable/AccountOpeningDate"/>
                  <bttdojo:column currency="EUR" numberType="bigDecimal" widget="TextBox" align="left" dataName="AccountBlance" width="80" type="Currency" text="%nls.testtable/AccountBlance"/>
                  <bttdojo:column widget="ComboBox" align="left" dataName="Rate" width="80" text="%nls.testtable/Rate" storeURL="listFiles/rateForCombo.js"/>
                  <bttdojo:column dataNameForList="LocaltionForComboBox" widget="ComboBox" align="left" dataName="Localtion" width="80" labelField="labelField" text="%nls.testtable/Localtion"/>
                  <bttdojo:column uncheckedValue="false" widget="CheckBox" align="left" dataName="Usable" width="80" checkedValue="true" text="%nls.testtable/Usable"/>
                  <bttdojo:column widget="LabelFromList" align="left" dataName="accountAttribution" width="80" text="%nls.testtable/accountAttribution" storeURL="listFiles/accountAttribution.js"/>
                  <bttdojo:column widget="Image" align="left" dataName="ImageField" width="80" text="%nls.testtable/Image"/>
                </bttdojo:table>
              </td>
            </tr>
            <tr>
              <td valign="top">
                  <table id="EditableTable_panel01">
                    <tr>
                      <td valign="top">
                          <table id="EditableTable_panel02">
                            <tr>
                              <td valign="top">
                                <bttdojo:group id="EditableTable_group" text="Test in group">
                                  <table id="EditableTable_group">
                                    <tr>
                                      <td>
                                        <bttdojo:a id="EditableTable_link" text="Link to \'table in group\' page" flowEvent="LinkToGroup"/>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <bttdojo:a id="EditableTable_link02" text="Link to popup page" flowEvent="group popup"/>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td valign="top">
                                          <table id="EditableTable_panel04">
                                            <tr>
                                              <td>
                                                <bttdojo:button id="EditableTable_button" type="submit" text="submit to group page" flowEvent="submit to group page"/>
                                              </td>
                                              <td>
                                                <bttdojo:button id="EditableTable_button02" type="submit" text="submit to group popup page" flowEvent="submit to group popup page"/>
                                              </td>
                                            </tr>
                                          </table>
                                      </td>
                                    </tr>
                                  </table>
                                </bttdojo:group>
                              </td>
                              <td>
                              </td>
                            </tr>
                            <tr>
                              <td valign="top">
                                <bttdojo:group id="EditableTable_group01" text="Test inTabbedpane">
                                  <table id="EditableTable_group01">
                                    <tr>
                                      <td>
                                        <bttdojo:a id="EditableTable_link01" text="Link to \'table in TabbedPane\' page" flowEvent="LinkToPane"/>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <bttdojo:a id="EditableTable_link04" text="Link to popup page" flowEvent="pane popup"/>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td valign="top">
                                          <table id="EditableTable_panel05">
                                            <tr>
                                              <td>
                                                <bttdojo:button id="EditableTable_button01" type="submit" text="submit to pane page" flowEvent="submit to pane page"/>
                                              </td>
                                              <td>
                                                <bttdojo:button id="EditableTable_button03" type="submit" text="submit to pane popup page" flowEvent="submit to pane popup page"/>
                                              </td>
                                            </tr>
                                          </table>
                                      </td>
                                    </tr>
                                  </table>
                                </bttdojo:group>
                              </td>
                              <td>
                              </td>
                            </tr>
                            <tr>
                              <td valign="top">
                                  <table id="EditableTable_panel03">
                                    <tr>
                                      <td valign="top">
                                        <bttdojo:group id="EditableTable_group02" text="Test in \'manipulate table\'">
                                          <table id="EditableTable_group02">
                                            <tr>
                                              <td>
                                                <bttdojo:a id="EditableTable_link03" text="Link to \'manipulate table\' page" flowEvent="manipulatetable"/>
                                              </td>
                                            </tr>
                                          </table>
                                        </bttdojo:group>
                                      </td>
                                    </tr>
                                  </table>
                              </td>
                              <td>
                              </td>
                            </tr>
                          </table>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
          </table>
        </bttdojo:form>
      </td>
    </tr>
  </table>

</body>
</html>