<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<jsp:useBean id="utb" scope="page" class="com.ibm.btt.cs.html.DSEJspContextServices">
	<%
		utb.initialize(request);			  
	%>
</jsp:useBean>	
<html>
<!-- Generated from index.xui by ghost, on Wed Dec 05 18:57:17 CST 2012 -->
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
  <table id="index_null">
    <tr>
      <td align="left" valign="top">
        <bttdojo:form id="index_form" errorPage="index.jsp" style="width:375px;height:361px;">
          <table style="width:375px;height:361px;">
            <tr>
              <td align="left" valign="center">
                <bttdojo:label id="index_label" text="%nls.bttsample/Welcome_To_Btt_Sample"/>
              </td>
            </tr>
            <tr>
              <td align="left" valign="center">
                <bttdojo:a id="index_link" text="%nls.bttsample/Click_Link_Run_Flow" flowId="sampleFlow"/>
              </td>
            </tr>
            <tr>
              <td align="left" valign="center">
                <bttdojo:a id="index_link02" text="nonEditable" flowId="nonEditableTableFlow"/>
              </td>
            </tr>
            <tr>
              <td align="left" valign="center">
                <bttdojo:a id="index_link01" text="editable" flowId="editableTableFlow"/>
              </td>
            </tr>
            <tr>
              <td align="left" valign="top">
                <bttdojo:group id="index_group" text="PaginationIndex">
                  <table>
                    <tr>
                      <td>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" valign="center">
                        <bttdojo:a id="index_link03" text="TFtable" flowId="PaginationTFFlow" flowEvent="start"/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" valign="center">
                        <bttdojo:a id="index_link04" text="TTtable" flowId="PaginationTTFlow" flowEvent="start"/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" valign="center">
                        <bttdojo:a id="index_link05" text="FFtable" flowId="PaginationFFFlow" flowEvent="start"/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" valign="center">
                        <bttdojo:a id="index_link06" text="FTtable" flowId="PaginationFTFlow"/>
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