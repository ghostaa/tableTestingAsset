<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<jsp:useBean id="utb" scope="page" class="com.ibm.btt.cs.html.DSEJspContextServices">
	<%
		utb.initialize(request);			  
	%>
</jsp:useBean>	
<html>
<!-- Generated from FT.xui by ghost, on Wed Dec 05 18:57:09 CST 2012 -->
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
<script type="text/javascript" src="<%=JSPUtil.getWebContextRootUrl()%>jsp/PaginationTablePage/FT/FT.js"> </script>
  <table id="FT_panel">
    <tr>
      <td align="left" valign="top">
        <bttdojo:form id="FT_form" errorPage="PaginationTablePage/FT/FT.jsp">
          <table>
            <tr>
              <td align="left" valign="top">
                  <table id="FT_panel01">
                    <tr>
                      <td align="left" valign="center">
                        <bttdojo:label id="FT_label" text="FTtable"/>
                      </td>
                    </tr>
                  </table>
              </td>
            </tr>
            <tr>
              <td align="left" valign="center">
                <bttdojo:table id="FT_tableFT" dataName="selectAccountList" dataNameForList="AccountInfoList" isPageable="true" selectionMode="multiple" selectionRequired="true" operationName="PAG_PaginationTablePage$FT$FT_tableFT" directPagination="false" paginationWhenLoading="true" rowsPerPage="10" timeout="800000">
                  <bttdojo:column widget="TextBox" align="left" dataName="AccountName" width="80" type="String" text="%nls.testtable/AccountName"/>
                  <bttdojo:column dataNameForList="AccountTypeForSelect" widget="Select" align="left" dataName="AccountType" width="80" labelField="labelField" valueField="valueField" text="%nls.testtable/AccountType"/>
                  <bttdojo:column widget="Select" align="left" dataName="TradeTime" width="80" text="%nls.testtable/TradeTime" storeURL="listFiles/tradeTimeForSelect.js"/>
                  <bttdojo:column numberType="bigDecimal" widget="TextBox" align="left" dataName="MaximumAmount" width="80" type="Number" decimalPlaces="3" text="%nls.testtable/MaximumAmount"/>
                  <bttdojo:column pattern="yyyy-MM-dd" widget="TextBox" align="left" dataName="AccountOpeningDate" width="100" type="Date" text="%nls.testtable/AccountOpeningDate"/>
                  <bttdojo:column currency="EUR" numberType="bigDecimal" widget="TextBox" align="left" dataName="AccountBlance" width="80" type="Currency" text="%nls.testtable/AccountBlance"/>
                  <bttdojo:column dataNameForList="LocaltionForComboBox" widget="ComboBox" align="left" dataName="Localtion" width="80" labelField="labelField" text="%nls.testtable/Localtion"/>
                  <bttdojo:column widget="ComboBox" align="left" dataName="Rate" width="80" text="%nls.testtable/Rate" storeURL="listFiles/tradeTimeForCombo.js"/>
                  <bttdojo:column unCheckedValue="false" widget="CheckBox" align="left" dataName="Usable" width="80" checkedValue="true" text="%nls.testtable/Usable"/>
                  <bttdojo:column widget="LabelFromList" align="left" dataName="accountAttribution" width="80" text="%nls.testtable/accountAttribution"/>
                  <bttdojo:column widget="Image" align="left" dataName="ImageField" width="80" text="%nls.testtable/Image"/>
                </bttdojo:table>
              </td>
            </tr>
            <tr>
              <td align="left" valign="top">
                  <table id="FT_panel02">
                    <tr>
                      <td align="left" valign="top">
                        <bttdojo:group id="FT_group" text="Test in group">
                          <table>
                            <tr>
                              <td align="left" valign="center">
                                <bttdojo:a id="FT_link" text="Link to \'FTtable in group\'" flowEvent="LinkToGroup"/>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" valign="center">
                                <bttdojo:a id="FT_link02" text="Link to \'FTtable in popup group\'" flowEvent="group popup"/>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" valign="top">
                                  <table id="FT_panel04">
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
                      <td align="left" valign="top">
                        <bttdojo:group id="FT_group01" text="Test in Tabbedpane">
                          <table>
                            <tr>
                              <td align="left" valign="center">
                                <bttdojo:a id="FT_link01" text="Link to \'FTtable in TabbedPane\'" flowEvent="LinkToPane"/>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" valign="center">
                                <bttdojo:a id="FT_link04" text="Link to \'FTtable in popup TabbedPane\'" flowEvent="pane popup"/>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" valign="top">
                                  <table id="FT_panel05">
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
                      <td align="left" valign="top">
                          <table id="FT_panel03">
                            <tr>
                              <td>
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