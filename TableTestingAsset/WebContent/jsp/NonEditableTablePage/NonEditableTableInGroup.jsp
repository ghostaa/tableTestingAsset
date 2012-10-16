<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<jsp:useBean id="utb" scope="page" class="com.ibm.btt.cs.html.DSEJspContextServices">
	<%
		utb.initialize(request);			  
	%>
</jsp:useBean>	
<html>
<!-- Generated from NonEditableTableInGroup.xui by ghost, on Tue Oct 16 16:56:47 CST 2012 -->
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
  <table id="NonEditableTableInGroup_panel">
    <tr>
      <td valign="top">
        <bttdojo:form id="NonEditableTableInGroup_form" errorPage="NonEditableTablePage/NonEditableTableInGroup.jsp">
          <table>
            <tr>
              <td valign="top">
                  <table id="NonEditableTableInGroup_panel01">
                    <tr>
                      <td>
                        <bttdojo:a id="NonEditableTableInGroup_link" text=" non-editable table" flowEvent="returnToNonEditableTable"/>
                      </td>
                      <td>
                        <bttdojo:label id="NonEditableTableInGroup_label" text=" -> non-editable table in group"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td valign="top">
                <bttdojo:group id="NonEditableTableInGroup_group" text="Group">
                  <table>
                    <tr>
                      <td>
                        <bttdojo:table id="NonEditableTableInGroup_table" dataName="AccountInfo" dataNameForList="nonEditableAccountList" selectionMode="single" selectionRequired="true" isPageable="false">
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
                      <td valign="top">
                          <table id="NonEditableTableInGroup_panel02">
                            <tr>
                              <td>
                                <bttdojo:button id="NonEditableTableInGroup_button" type="submit" text="to group popup page" flowEvent="to group popup page"/>
                              </td>
                              <td>
                                <bttdojo:button id="NonEditableTableInGroup_button01" type="submit" text="to pane page" flowEvent="to pane page"/>
                              </td>
                            </tr>
                          </table>
                      </td>
                    </tr>
                  </table>
                </bttdojo:group>
              </td>
            </tr>
          </table>
        </bttdojo:form>
      </td>
    </tr>
  </table>

</body>
</html>