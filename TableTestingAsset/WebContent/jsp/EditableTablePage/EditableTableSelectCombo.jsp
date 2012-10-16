<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<jsp:useBean id="utb" scope="page" class="com.ibm.btt.cs.html.DSEJspContextServices">
	<%
		utb.initialize(request);			  
	%>
</jsp:useBean>	
<html>
<!-- Generated from EditableTableSelectCombo.xui by ghost, on Tue Oct 16 16:56:47 CST 2012 -->
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
<script type="text/javascript" src="<%=JSPUtil.getWebContextRootUrl()%>jsp/EditableTablePage/EditableTableSelectCombo.js"> </script>
  <table id="EditableTableSelectCombo_panel">
    <tr>
      <td valign="top">
        <bttdojo:form id="EditableTableSelectCombo_form" errorPage="EditableTablePage/EditableTableSelectCombo.jsp">
          <table>
            <tr>
              <td valign="top">
                  <table id="EditableTableSelectCombo_panel03">
                    <tr>
                      <td>
                        <bttdojo:a id="EditableTableSelectCombo_link_copy" text="editable table" flowEvent="returnToEditable"/>
                      </td>
                      <td>
                        <bttdojo:label id="EditableTableSelectCombo_label" text=" -> Selection and bombox table"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td valign="top">
                  <table id="EditableTableSelectCombo_panel01">
                    <tr>
                      <td>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td>
                <bttdojo:table id="EditableTableSelectCombo_table" dataName="selectAccountList" dataNameForList="EditableAccountList" sortEnabled="true" columnReordering="true" selectionMode="multiple" selectionRequired="true" isPageable="false">
                  <bttdojo:column dataNameForList="AccountTypeForSelect" widget="Select" align="left" dataName="AccountType" width="80" labelField="labelField" valueField="valueField" text="%nls.testtable/AccountType"/>
                  <bttdojo:column dataNameForList="AccountTypeForSelect" widget="Select" align="left" dataName="AccountType" width="80" labelField="labelField" valueField="valueField" text="%nls.testtable/AccountTypeValue"/>
                  <bttdojo:column dataNameForList="LocaltionForComboBox" widget="ComboBox" align="left" dataName="Localtion" width="80" labelField="labelField" text="%nls.testtable/Localtion"/>
                  <bttdojo:column dataNameForList="LocaltionForComboBox" widget="ComboBox" align="left" dataName="Localtion" width="80" labelField="labelField" text="%nls.testtable/LocaltionTypeValue"/>
                </bttdojo:table>
              </td>
            </tr>
            <tr>
              <td valign="top">
                  <table id="EditableTableSelectCombo_visibility">
                    <tr>
                      <td>
                        <bttdojo:button id="EditableTableSelectCombo_visible" type="button" text="visible"/>
                      </td>
                      <td>
                        <bttdojo:button id="EditableTableSelectCombo_hidden" type="button" text="hidden"/>
                      </td>
                      <td>
                        <bttdojo:button id="EditableTableSelectCombo_gone" type="button" text="gone"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td valign="top">
                  <table id="EditableTableSelectCombo_disabled">
                    <tr>
                      <td>
                        <bttdojo:label id="EditableTableSelectCombo_label02" text="disabled:"/>
                      </td>
                      <td>
                        <bttdojo:button id="EditableTableSelectCombo_disabletrue" type="button" text=" true"/>
                      </td>
                      <td>
                        <bttdojo:button id="EditableTableSelectCombo_disablefalse" type="button" text="false"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td valign="top">
                  <table id="EditableTableSelectCombo_readonly">
                    <tr>
                      <td>
                        <bttdojo:label id="EditableTableSelectCombo_readonlylabel" text="read only:"/>
                      </td>
                      <td>
                        <bttdojo:button id="EditableTableSelectCombo_readonlytrue" type="button" text="true"/>
                      </td>
                      <td>
                        <bttdojo:button id="EditableTableSelectCombo_readonlyfalse" type="button" text="false"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td>
                  <table id="EditableTableSelectCombo_panel02">
                    <tr>
                      <td>
                        <bttdojo:button id="EditableTableSelectCombo_To group popup page" type="submit" text="To group popup page" flowEvent="to group popup page"/>
                      </td>
                      <td>
                        <bttdojo:button id="EditableTableSelectCombo_To pane popup page" type="submit" text="To pane popup page" flowEvent="to pane popup page"/>
                      </td>
                      <td>
                        <bttdojo:button id="EditableTableSelectCombo_button" type="submit" text="To group page" flowEvent="to group page"/>
                      </td>
                      <td>
                        <bttdojo:button id="EditableTableSelectCombo_button01" type="submit" text="To pane page" flowEvent="to pane page"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td valign="top">
                  <table id="EditableTableSelectCombo_panel04">
                    <tr>
                      <td>
                        <bttdojo:button id="EditableTableSelectCombo_Change the hint from text" type="button" text="Change the hint from text"/>
                      </td>
                      <td>
                        <bttdojo:button id="EditableTableSelectCombo_Change the hint from NLS" type="button" text="Change the hint from NLS"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td>
                <bttdojo:button id="EditableTableSelectCombo_Change the CSS" type="button" text="Change the CSS"/>
              </td>
            </tr>
          </table>
        </bttdojo:form>
      </td>
    </tr>
  </table>

</body>
</html>