<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<jsp:useBean id="utb" scope="page" class="com.ibm.btt.cs.html.DSEJspContextServices">
	<%
		utb.initialize(request);			  
	%>
</jsp:useBean>	
<html>
<!-- Generated from TTInTabbedPane.xui by Administrator, on Mon Sep 24 15:40:27 CST 2012 -->
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
  <table id="TTInTabbedPane_panel">
    <tr>
      <td valign="top">
        <bttdojo:form id="TTInTabbedPane_form" errorPage="PaginationTablePage/TT/TTInTabbedPane.jsp">
          <table id="TTInTabbedPane_form">
            <tr>
              <td valign="top">
                  <table id="TTInTabbedPane_panel01">
                    <tr>
                      <td>
                        <bttdojo:a id="TTInTabbedPane_link" text="TTtable" flowEvent="returnToTFTable"/>
                      </td>
                      <td>
                        <bttdojo:label id="TTInTabbedPane_label" text="-> TTInTabbedPane"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td valign="top">
                <bttdojo:tabbedpane id="TTInTabbedPane_tabbedPane">
                  <bttdojo:contentpane id="TTInTabbedPane_ContentPane01" title="NormalTab">
                    <table id="TTInTabbedPane_ContentPane01" style="table-layout:fixed">
                      <tr>
                        <td>
                          <bttdojo:table id="TTInTabbedPane_tableTT" dataNameForList="AccountInfoList" isPageable="true" operationName="PAG_PaginationTablePage$TT$TTInTabbedPane_tableTT" directPagination="true" paginationWhenLoading="true" rowsPerPage="10">
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
                    </table>
                  </bttdojo:contentpane>
                  <bttdojo:contentpane id="TTInTabbedPane_ContentPane02" title="Group">
                    <table id="TTInTabbedPane_ContentPane02" style="table-layout:fixed">
                      <tr>
                        <td valign="top">
                          <bttdojo:group id="TTInTabbedPane_group" text="Group">
                            <table id="TTInTabbedPane_group">
                              <tr>
                                <td>
                                  <bttdojo:table id="TTInTabbedPane_tableTT1" dataNameForList="AccountInfoList" isPageable="true" operationName="PAG_PaginationTablePage$TT$TTInTabbedPane_tableTT1" directPagination="true" paginationWhenLoading="true" rowsPerPage="10">
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
                            </table>
                          </bttdojo:group>
                        </td>
                      </tr>
                    </table>
                  </bttdojo:contentpane>
                  <bttdojo:contentpane id="TTInTabbedPane_ContentPane03" title="Pane">
                    <table id="TTInTabbedPane_ContentPane03" style="table-layout:fixed">
                      <tr>
                        <td valign="top">
                          <bttdojo:tabbedpane id="TTInTabbedPane_tabbedPane01">
                            <bttdojo:contentpane id="TTInTabbedPane_ContentPane04" title="Tab01">
                              <table id="TTInTabbedPane_ContentPane04" style="table-layout:fixed">
                                <tr>
                                  <td>
                                    <bttdojo:label id="TTInTabbedPane_label01" text="tab01"/>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <bttdojo:table id="TTInTabbedPane_tableTT2" dataNameForList="AccountInfoList" isPageable="true" operationName="PAG_PaginationTablePage$TT$TTInTabbedPane_tableTT2" directPagination="true" paginationWhenLoading="true" rowsPerPage="10">
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
                              </table>
                            </bttdojo:contentpane>
                            <bttdojo:contentpane id="TTInTabbedPane_ContentPane05" title="Tab02">
                              <table id="TTInTabbedPane_ContentPane05" style="table-layout:fixed">
                                <tr>
                                  <td>
                                    <bttdojo:label id="TTInTabbedPane_label02" text="tab02"/>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <bttdojo:table id="TTInTabbedPane_tableTT3" dataNameForList="AccountInfoList" isPageable="true" operationName="PAG_PaginationTablePage$TT$TTInTabbedPane_tableTT3" directPagination="true" paginationWhenLoading="true" rowsPerPage="10">
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