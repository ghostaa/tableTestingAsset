<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<jsp:useBean id="utb" scope="page" class="com.ibm.btt.cs.html.DSEJspContextServices">
	<%
		utb.initialize(request);			  
	%>
</jsp:useBean>	
<html>
<!-- Generated from NonEditableTableIsManipulated.xui by ghost, on Wed Dec 05 18:57:05 CST 2012 -->
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
<script type="text/javascript" src="<%=JSPUtil.getWebContextRootUrl()%>jsp/NonEditableTablePage/NonEditableTableIsManipulated.js"> </script>
  <table id="NonEditableTableIsManipulated_panel">
    <tr>
      <td align="left" valign="top">
        <bttdojo:form id="NonEditableTableIsManipulated_form" errorPage="NonEditableTablePage/NonEditableTableIsManipulated.jsp">
          <table>
            <tr>
              <td align="left" valign="top">
                  <table id="NonEditableTableIsManipulated_panel03">
                    <tr>
                      <td align="left" valign="center">
                        <bttdojo:a id="NonEditableTableIsManipulated_link_copy" text=" non-editable table" flowEvent="returnToNonEditableTable"/>
                      </td>
                      <td align="left" valign="center">
                        <bttdojo:label id="NonEditableTableIsManipulated_label" text=" -> manipulate non-editable table"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td align="left" valign="top">
                  <table id="NonEditableTableIsManipulated_panel01">
                    <tr>
                      <td align="left" valign="center">
                        <bttdojo:label id="NonEditableTableIsManipulated_label01" text="Sort and columReorder"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td align="left" valign="center">
                <bttdojo:table id="NonEditableTableIsManipulated_table" dataName="selectAccountList" dataNameForList="nonEditableAccountList" sortEnabled="true" columnReordering="true" hint="the old hint" selectionMode="multiple" selectionRequired="true" isPageable="false">
                  <bttdojo:column align="left" dataName="AccountName" width="80" text="%nls.testtable/AccountName"/>
                  <bttdojo:column align="left" dataName="TradeTime" width="80" text="%nls.testtable/TradeTime"/>
                  <bttdojo:column align="left" dataName="MaximumAmount" width="80" text="%nls.testtable/MaximumAmount"/>
                  <bttdojo:column align="left" dataName="AccountOpeningDate" width="80" text="%nls.testtable/AccountOpeningDate"/>
                  <bttdojo:column align="left" dataName="AccountBlance" width="80" text="%nls.testtable/AccountBlance"/>
                  <bttdojo:column align="left" dataName="Rate" width="80" text="%nls.testtable/Rate"/>
                  <bttdojo:column align="left" dataName="Usable" width="80" text="%nls.testtable/Usable"/>
                </bttdojo:table>
              </td>
            </tr>
            <tr>
              <td align="left" valign="top">
                  <table id="NonEditableTableIsManipulated_visibility">
                    <tr>
                      <td align="left" valign="center">
                        <bttdojo:button id="NonEditableTableIsManipulated_visible" type="button" text="visible"/>
                      </td>
                      <td align="left" valign="center">
                        <bttdojo:button id="NonEditableTableIsManipulated_hidden" type="button" text="hidden"/>
                      </td>
                      <td align="left" valign="center">
                        <bttdojo:button id="NonEditableTableIsManipulated_gone" type="button" text="gone"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td align="left" valign="top">
                  <table id="NonEditableTableIsManipulated_disabled">
                    <tr>
                      <td align="left" valign="center">
                        <bttdojo:label id="NonEditableTableIsManipulated_label02" text="disabled:"/>
                      </td>
                      <td align="left" valign="center">
                        <bttdojo:button id="NonEditableTableIsManipulated_disabletrue" type="button" text=" true"/>
                      </td>
                      <td align="left" valign="center">
                        <bttdojo:button id="NonEditableTableIsManipulated_disablefalse" type="button" text="false"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td align="left" valign="top">
                  <table id="NonEditableTableIsManipulated_readonly">
                    <tr>
                      <td align="left" valign="center">
                        <bttdojo:label id="NonEditableTableIsManipulated_readonlylabel" text="read only:"/>
                      </td>
                      <td align="left" valign="center">
                        <bttdojo:button id="NonEditableTableIsManipulated_readonlytrue" type="button" text="true"/>
                      </td>
                      <td align="left" valign="center">
                        <bttdojo:button id="NonEditableTableIsManipulated_readonlyfalse" type="button" text="false"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td>
                  <table id="NonEditableTableIsManipulated_panel02">
                    <tr>
                      <td align="left" valign="center">
                        <bttdojo:button id="NonEditableTableIsManipulated_To group popup page" type="submit" text="To group popup page" flowEvent="to group popup page"/>
                      </td>
                      <td align="left" valign="center">
                        <bttdojo:button id="NonEditableTableIsManipulated_To pane popup page" type="submit" text="To pane popup page" flowEvent="to pane popup page"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td align="left" valign="top">
                  <table id="NonEditableTableIsManipulated_panel04">
                    <tr>
                      <td align="left" valign="center">
                        <bttdojo:button id="NonEditableTableIsManipulated_Change the hint from text" type="button" text="Change the hint from text"/>
                      </td>
                      <td align="left" valign="center">
                        <bttdojo:button id="NonEditableTableIsManipulated_Change the hint from NLS" type="button" text="Change the hint from NLS"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td align="left" valign="center">
                <bttdojo:button id="NonEditableTableIsManipulated_Change the CSS" type="button" text="Change the CSS"/>
              </td>
            </tr>
          </table>
        </bttdojo:form>
      </td>
    </tr>
  </table>

</body>
</html>