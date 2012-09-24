<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<jsp:useBean id="utb" scope="page" class="com.ibm.btt.cs.html.DSEJspContextServices">
	<%
		utb.initialize(request);			  
	%>
</jsp:useBean>	
<html>
<!-- Generated from FF.xui by Administrator, on Mon Sep 24 13:57:04 CST 2012 -->
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
  <table id="FF_panel">
    <tr>
      <td valign="top">
        <bttdojo:form id="FF_form" errorPage="PaginationTablePage/FF/FF.jsp">
          <table id="FF_form">
            <tr>
              <td valign="top">
                  <table id="FF_panel01">
                    <tr>
                      <td>
                        <bttdojo:label id="FF_label" text="FFtable"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td>
                <bttdojo:table id="FF_tableFF" dataNameForList="AccountInfoList" isPageable="true" operationName="PAG_PaginationTablePage$FF$FF_tableFF" directPagination="false" paginationWhenLoading="false" rowsPerPage="10">
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
                  <table id="FF_panel02">
                    <tr>
                      <td valign="top">
                        <bttdojo:group id="FF_group" text="Test in group">
                          <table id="FF_group">
                            <tr>
                              <td>
                                <bttdojo:a id="FF_link" text="Link to \'FFtable in group\'" flowEvent="group"/>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <bttdojo:a id="FF_link02" text="Link to \'FFtable in popup group\'" flowEvent="groupPopup"/>
                              </td>
                            </tr>
                            <tr>
                              <td valign="top">
                                  <table id="FF_panel04">
                                    <tr>
                                      <td>
                                      </td>
                                      <td>
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
                        <bttdojo:group id="FF_group01" text="Test in Tabbedpane">
                          <table id="FF_group01">
                            <tr>
                              <td>
                                <bttdojo:a id="FF_link01" text="Link to \'FFtable in TabbedPane\'" flowEvent="tabbedPane"/>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <bttdojo:a id="FF_link04" text="Link to \'FFtable in popup TabbedPane\'" flowEvent="tabbedPanePopup"/>
                              </td>
                            </tr>
                            <tr>
                              <td valign="top">
                                  <table id="FF_panel05">
                                    <tr>
                                      <td>
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
                          <table id="FF_panel03">
                            <tr>
                              <td valign="top">
                                <bttdojo:group id="FF_group02" text="Test in manipulate table">
                                  <table id="FF_group02">
                                    <tr>
                                      <td>
                                        <bttdojo:a id="FF_link03" text="Link to \'manipulate TFtable\'" flowEvent="manipulatetable"/>
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