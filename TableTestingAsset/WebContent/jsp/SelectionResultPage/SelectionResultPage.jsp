<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<jsp:useBean id="utb" scope="page" class="com.ibm.btt.cs.html.DSEJspContextServices">
	<%
		utb.initialize(request);			  
	%>
</jsp:useBean>	
<html>
<!-- Generated from SelectionResultPage.xui by ghost, on Wed Dec 05 18:57:17 CST 2012 -->
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
  <table id="SelectionResultPage_panel">
    <tr>
      <td align="left" valign="top">
        <bttdojo:form id="SelectionResultPage_form" errorPage="SelectionResultPage/SelectionResultPage.jsp">
          <table>
            <tr>
              <td align="left" valign="top">
                  <table id="SelectionResultPage_panel01">
                    <tr>
                      <td align="left" valign="center">
                        <bttdojo:a id="SelectionResultPage_link_copy" text="back" flowEvent="back"/>
                      </td>
                      <td align="left" valign="center">
                        <bttdojo:label id="SelectionResultPage_label" text=" -> Selection Result"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td align="left" valign="center">
                <bttdojo:table id="SelectionResultPage_table" dataNameForList="selectAccountList" isPageable="false">
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
        </bttdojo:form>
      </td>
    </tr>
  </table>

</body>
</html>