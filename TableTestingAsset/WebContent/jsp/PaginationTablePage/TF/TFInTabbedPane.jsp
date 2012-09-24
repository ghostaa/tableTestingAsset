<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<jsp:useBean id="utb" scope="page" class="com.ibm.btt.cs.html.DSEJspContextServices">
	<%
		utb.initialize(request);			  
	%>
</jsp:useBean>	
<html>
<!-- Generated from TFInTabbedPane.xui by Administrator, on Fri Sep 21 13:32:17 CST 2012 -->
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
  <table id="TFInTabbedPane_panel">
    <tr>
      <td valign="top">
        <bttdojo:form id="TFInTabbedPane_form" errorPage="PaginationTablePage/TF/TFInTabbedPane.jsp">
          <table id="TFInTabbedPane_form">
            <tr>
              <td valign="top">
                  <table id="TFInTabbedPane_panel01">
                    <tr>
                      <td>
                        <bttdojo:a id="TFInTabbedPane_link" text="TFtable" flowEvent="returnToTFTable"/>
                      </td>
                      <td>
                        <bttdojo:label id="TFInTabbedPane_label" text="-> TFInTabbedPane"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td valign="top">
                <bttdojo:tabbedpane id="TFInTabbedPane_tabbedPane">
                  <bttdojo:contentpane id="TFInTabbedPane_ContentPane01" title="NormalTab">
                    <table id="TFInTabbedPane_ContentPane01" style="table-layout:fixed">
                      <tr>
                        <td>
                          <bttdojo:table id="TFInTabbedPane_tableTF" dataNameForList="AccountInfoList" isPageable="true" operationName="PAG_PaginationTablePage$TF$TFInTabbedPane_tableTF" directPagination="true" paginationWhenLoading="false" rowsPerPage="10">
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
                  <bttdojo:contentpane id="TFInTabbedPane_ContentPane02" title="Group">
                    <table id="TFInTabbedPane_ContentPane02" style="table-layout:fixed">
                      <tr>
                        <td valign="top">
                          <bttdojo:group id="TFInTabbedPane_group" text="Group">
                            <table id="TFInTabbedPane_group">
                              <tr>
                                <td>
                                  <bttdojo:table id="TFInTabbedPane_tableTF1" dataNameForList="AccountInfoList" isPageable="true" operationName="PAG_PaginationTablePage$TF$TFInTabbedPane_tableTF1" directPagination="true" paginationWhenLoading="false" rowsPerPage="10">
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
                  <bttdojo:contentpane id="TFInTabbedPane_ContentPane03" title="Pane">
                    <table id="TFInTabbedPane_ContentPane03" style="table-layout:fixed">
                      <tr>
                        <td valign="top">
                          <bttdojo:tabbedpane id="TFInTabbedPane_tabbedPane01">
                            <bttdojo:contentpane id="TFInTabbedPane_ContentPane04" title="Tab01">
                              <table id="TFInTabbedPane_ContentPane04" style="table-layout:fixed">
                                <tr>
                                  <td>
                                    <bttdojo:label id="TFInTabbedPane_label01" text="tab01"/>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <bttdojo:table id="TFInTabbedPane_tableTF2" dataNameForList="AccountInfoList" isPageable="true" operationName="PAG_PaginationTablePage$TF$TFInTabbedPane_tableTF2" directPagination="true" paginationWhenLoading="false" rowsPerPage="10">
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
                            <bttdojo:contentpane id="TFInTabbedPane_ContentPane05" title="Tab02">
                              <table id="TFInTabbedPane_ContentPane05" style="table-layout:fixed">
                                <tr>
                                  <td>
                                    <bttdojo:label id="TFInTabbedPane_label02" text="tab02"/>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <bttdojo:table id="TFInTabbedPane_tableTF3" dataNameForList="AccountInfoList" isPageable="true" operationName="PAG_PaginationTablePage$TF$TFInTabbedPane_tableTF3" directPagination="true" paginationWhenLoading="false" rowsPerPage="10">
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