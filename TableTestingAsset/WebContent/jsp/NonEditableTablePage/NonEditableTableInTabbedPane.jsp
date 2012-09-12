<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<jsp:useBean id="utb" scope="page" class="com.ibm.btt.cs.html.DSEJspContextServices">
	<%
		utb.initialize(request);			  
	%>
</jsp:useBean>	
<html>
<!-- Generated from NonEditableTableInTabbedPane.xui by ghost, on Wed Sep 12 14:05:38 CST 2012 -->
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
@import "js/com/ibm/btt/dijit/templates/dijit.css";

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
  <table id="NonEditableTableInTabbedPane_panel">
    <tr>
      <td valign="top">
        <bttdojo:form id="NonEditableTableInTabbedPane_form" errorPage="NonEditableTablePage/NonEditableTableInTabbedPane.jsp">
          <table id="NonEditableTableInTabbedPane_form">
            <tr>
              <td valign="top">
                  <table id="NonEditableTableInTabbedPane_panel01">
                    <tr>
                      <td>
                        <bttdojo:a id="NonEditableTableInTabbedPane_link" text=" non-editable table" flowEvent="returnToNonEditableTable"/>
                      </td>
                      <td>
                        <bttdojo:label id="NonEditableTableInTabbedPane_label" text="-> non-editable table in TabbedPane"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td valign="top">
                <bttdojo:tabbedpane id="NonEditableTableInTabbedPane_tabbedPane">
                  <bttdojo:contentpane id="NonEditableTableInTabbedPane_ContentPane01" title="NormalTab">
                    <table id="NonEditableTableInTabbedPane_ContentPane01" style="table-layout:fixed">
                      <tr>
                        <td>
                          <bttdojo:table id="NonEditableTableInTabbedPane_table" dataName="selectAccountList" dataNameForList="nonEditableAccountList" selectionMode="multiple" selectionRequired="true" isPageable="false">
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
                            <table id="NonEditableTableInTabbedPane_panel02">
                              <tr>
                                <td>
                                  <bttdojo:button id="NonEditableTableInTabbedPane_button" type="submit" text="to group page" flowEvent="to group page"/>
                                </td>
                                <td>
                                  <bttdojo:button id="NonEditableTableInTabbedPane_button01" type="submit" text="to pane popup page" flowEvent="to pane popup page"/>
                                </td>
                              </tr>
                            </table>
                        </td>
                      </tr>
                    </table>
                  </bttdojo:contentpane>
                  <bttdojo:contentpane id="NonEditableTableInTabbedPane_ContentPane02" title="Group">
                    <table id="NonEditableTableInTabbedPane_ContentPane02" style="table-layout:fixed">
                      <tr>
                        <td valign="top">
                          <bttdojo:group id="NonEditableTableInTabbedPane_group" text="Group">
                            <table id="NonEditableTableInTabbedPane_group">
                              <tr>
                                <td>
                                  <bttdojo:table id="NonEditableTableInTabbedPane_table_copy" dataNameForList="nonEditableAccountList" isPageable="false">
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
                            </table>
                          </bttdojo:group>
                        </td>
                      </tr>
                    </table>
                  </bttdojo:contentpane>
                  <bttdojo:contentpane id="NonEditableTableInTabbedPane_ContentPane03" title="Pane">
                    <table id="NonEditableTableInTabbedPane_ContentPane03" style="table-layout:fixed">
                      <tr>
                        <td valign="top">
                          <bttdojo:tabbedpane id="NonEditableTableInTabbedPane_tabbedPane01">
                            <bttdojo:contentpane id="NonEditableTableInTabbedPane_ContentPane04" title="Tab01">
                              <table id="NonEditableTableInTabbedPane_ContentPane04" style="table-layout:fixed">
                                <tr>
                                  <td>
                                    <bttdojo:label id="NonEditableTableInTabbedPane_label01" text="tab01"/>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <bttdojo:table id="NonEditableTableInTabbedPane_table_copy01" dataNameForList="nonEditableAccountList" isPageable="false">
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
                              </table>
                            </bttdojo:contentpane>
                            <bttdojo:contentpane id="NonEditableTableInTabbedPane_ContentPane05" title="Tab02">
                              <table id="NonEditableTableInTabbedPane_ContentPane05" style="table-layout:fixed">
                                <tr>
                                  <td>
                                    <bttdojo:label id="NonEditableTableInTabbedPane_label02" text="tab02"/>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <bttdojo:table id="NonEditableTableInTabbedPane_table_copy01_copy" dataNameForList="nonEditableAccountList" isPageable="false">
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
                              </table>
                            </bttdojo:contentpane>
                          </bttdojo:tabbedpane>
                        </td>
                      </tr>
                    </table>
                  </bttdojo:contentpane>
                </bttdojo:tabbedpane>
              </td>
            </tr>
            <tr>
              <td>
              </td>
            </tr>
          </table>
        </bttdojo:form>
      </td>
    </tr>
  </table>

</body>
</html>