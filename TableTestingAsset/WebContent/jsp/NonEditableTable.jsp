<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<jsp:useBean id="utb" scope="page" class="com.ibm.btt.cs.html.DSEJspContextServices">
	<%
		utb.initialize(request);			  
	%>
</jsp:useBean>	
<html>
<!-- Generated from NonEditableTable.xui by ghost, on Mon Sep 10 18:39:54 CST 2012 -->
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
  <table id="NonEditableTable_panel">
    <tr>
      <td valign="top">
        <bttdojo:form id="NonEditableTable_form" errorPage="NonEditableTable.jsp">
          <table id="NonEditableTable_form">
            <tr>
              <td valign="top">
                  <table id="NonEditableTable_panel01">
                    <tr>
                      <td>
                        <bttdojo:label id="NonEditableTable_label" text=" non-editable table"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td>
                <bttdojo:table id="NonEditableTable_table" dataNameForList="nonEditableAccountList" isPageable="false">
                  <bttdojo:column align="left" dataName="AccountName" width="80" text="%nls.testtable/AccountName"/>
                  <bttdojo:column align="left" dataName="TradeTime" width="80" text="%nls.testtable/TradeTime"/>
                  <bttdojo:column align="left" dataName="MaximumAmount" width="80" text="%nls.testtable/MaximumAmount"/>
                  <bttdojo:column align="left" dataName="AccountOpeningDate" width="100" text="%nls.testtable/AccountOpeningDate"/>
                  <bttdojo:column align="left" dataName="AccountBlance" width="80" text="%nls.testtable/AccountBlance"/>
                  <bttdojo:column align="left" dataName="Rate" width="80" text="%nls.testtable/Rate"/>
                  <bttdojo:column align="left" dataName="Usable" width="80" text="%nls.testtable/Usable"/>
                </bttdojo:table>
              </td>
            </tr>
            <tr>
              <td valign="top">
                  <table id="NonEditableTable_panel02">
                    <tr>
                      <td valign="top">
                        <bttdojo:group id="NonEditableTable_group" text="Test in group">
                          <table id="NonEditableTable_group">
                            <tr>
                              <td>
                                <bttdojo:a id="NonEditableTable_link" text="Link to \'table in group\' page" flowEvent="LinkToGroup"/>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <bttdojo:a id="NonEditableTable_link02" text="Link to popup page" flowEvent="group popup"/>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <bttdojo:button id="NonEditableTable_button" type="button" text="Button"/>
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
                        <bttdojo:group id="NonEditableTable_group01" text="Test inTabbedpane">
                          <table id="NonEditableTable_group01">
                            <tr>
                              <td>
                                <bttdojo:a id="NonEditableTable_link01" text="Link to \'table in TabbedPane\' page" flowEvent="LinkToPane"/>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <bttdojo:a id="NonEditableTable_link04" text="Link to popup page" flowEvent="pane popup"/>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <bttdojo:button id="NonEditableTable_button01" type="button" text="Button"/>
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
                          <table id="NonEditableTable_panel03">
                            <tr>
                              <td valign="top">
                                <bttdojo:group id="NonEditableTable_group02" text="Test in \'manipulate table\'">
                                  <table id="NonEditableTable_group02">
                                    <tr>
                                      <td>
                                        <bttdojo:a id="NonEditableTable_link03" text="Link to \'manipulate table\' page" flowEvent="manipulatetable"/>
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
        </bttdojo:form>
      </td>
    </tr>
  </table>

</body>
</html>