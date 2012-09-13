<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<jsp:useBean id="utb" scope="page" class="com.ibm.btt.cs.html.DSEJspContextServices">
	<%
		utb.initialize(request);			  
	%>
</jsp:useBean>	
<html>
<!-- Generated from SelectionResultInGroupPage.xui by ghost, on Thu Sep 13 13:59:36 CST 2012 -->
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
  <table id="SelectionResultInGroupPage_panel">
    <tr>
      <td valign="top">
        <bttdojo:form id="SelectionResultInGroupPage_form" errorPage="SelectionResultPage/SelectionResultInGroupPage.jsp">
          <table id="SelectionResultInGroupPage_form">
            <tr>
              <td valign="top">
                  <table id="SelectionResultInGroupPage_panel01">
                    <tr>
                      <td>
                        <bttdojo:a id="SelectionResultInGroupPage_link_copy" text="non-editable table" flowEvent="back"/>
                      </td>
                      <td>
                        <bttdojo:label id="SelectionResultInGroupPage_label" text=" -> Selection Result in group"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td valign="top">
                <bttdojo:group id="SelectionResultInGroupPage_group" text="multi-selection result">
                  <table id="SelectionResultInGroupPage_group">
                    <tr>
                      <td>
                        <bttdojo:table id="SelectionResultInGroupPage_table" dataNameForList="selectAccountList" isPageable="false">
                          <bttdojo:column align="left" dataName="AccountName" width="80" text="%nls.testtable/AccountName"/>
                          <bttdojo:column align="left" dataName="TradeTime" width="80" text="%nls.testtable/TradeTime"/>
                          <bttdojo:column align="left" dataName="MaximumAmount" width="80" text="%nls.testtable/MaximumAmount"/>
                          <bttdojo:column align="left" dataName="AccountOpeningDate" width="80" text="%nls.testtable/AccountOpeningDate"/>
                          <bttdojo:column align="left" dataName="AccountBlance" width="80" text="%nls.testtable/AccountBlance"/>
                          <bttdojo:column align="left" dataName="Rate" width="80" text="%nls.testtable/Rate"/>
                        </bttdojo:table>
                      </td>
                    </tr>
                    <tr>
                      <td>
                      </td>
                    </tr>
                  </table>
                </bttdojo:group>
              </td>
            </tr>
            <tr>
              <td valign="top">
                <bttdojo:group id="SelectionResultInGroupPage_group01" text="single-selection result">
                  <table id="SelectionResultInGroupPage_group01">
                    <tr>
                      <td>
                        <bttdojo:label id="SelectionResultInGroupPage_label08" text="AccountName"/>
                      </td>
                      <td>
                        <bttdojo:label id="SelectionResultInGroupPage_label01" dataName="AccountInfo.AccountName" text="Label"/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <bttdojo:label id="SelectionResultInGroupPage_label09" text="TradeTime"/>
                      </td>
                      <td>
                        <bttdojo:label id="SelectionResultInGroupPage_label02" dataName="AccountInfo.TradeTime" text="Label"/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <bttdojo:label id="SelectionResultInGroupPage_label10" text="MaximumAmount"/>
                      </td>
                      <td>
                        <bttdojo:label id="SelectionResultInGroupPage_label03" dataName="AccountInfo.MaximumAmount" text="Label"/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <bttdojo:label id="SelectionResultInGroupPage_label11" text="AccountOpeningDate"/>
                      </td>
                      <td>
                        <bttdojo:label id="SelectionResultInGroupPage_label04" dataName="AccountInfo.AccountOpeningDate" text="Label"/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <bttdojo:label id="SelectionResultInGroupPage_label12" text="AccountBlance"/>
                      </td>
                      <td>
                        <bttdojo:label id="SelectionResultInGroupPage_label05" dataName="AccountInfo.AccountBlance" text="Label"/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <bttdojo:label id="SelectionResultInGroupPage_label13" text="Rate"/>
                      </td>
                      <td>
                        <bttdojo:label id="SelectionResultInGroupPage_label06" dataName="AccountInfo.Rate" text="Label"/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <bttdojo:label id="SelectionResultInGroupPage_label14" text="Usable"/>
                      </td>
                      <td>
                        <bttdojo:label id="SelectionResultInGroupPage_label07" dataName="AccountInfo.Usable" text="Label"/>
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