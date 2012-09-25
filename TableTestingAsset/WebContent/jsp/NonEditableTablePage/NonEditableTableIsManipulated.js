window.NonEditableTableIsManipulated = [{ /* ecaRule */
  name: 'ecaRule',
  evts: [{ id: 'NonEditableTableIsManipulated_visible', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('NonEditableTableIsManipulated_table', 'visibility', 'visible');
  }
}, 
{ /* ecaRule01 */
  name: 'ecaRule01',
  evts: [{ id: 'NonEditableTableIsManipulated_hidden', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('NonEditableTableIsManipulated_table', 'visibility', 'hidden');
  }
}, 
{ /* ecaRule02 */
  name: 'ecaRule02',
  evts: [{ id: 'NonEditableTableIsManipulated_gone', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('NonEditableTableIsManipulated_table', 'visibility', 'gone');
  }
}, 
{ /* ecaRule03 */
  name: 'ecaRule03',
  evts: [{ id: 'NonEditableTableIsManipulated_disabletrue', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('NonEditableTableIsManipulated_table', 'disabled', true);
  }
}, 
{ /* ecaRule04 */
  name: 'ecaRule04',
  evts: [{ id: 'NonEditableTableIsManipulated_disablefalse', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('NonEditableTableIsManipulated_table', 'disabled', false);
  }
}, 
{ /* ecaRule05 */
  name: 'ecaRule05',
  evts: [{ id: 'NonEditableTableIsManipulated_readonlytrue', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('NonEditableTableIsManipulated_table', 'readOnly', true);
  }
}, 
{ /* ecaRule06 */
  name: 'ecaRule06',
  evts: [{ id: 'NonEditableTableIsManipulated_readonlyfalse', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('NonEditableTableIsManipulated_table', 'readOnly', false);
  }
}, 
{ /* ecaRule07 */
  name: 'ecaRule07',
  evts: [{ id: 'NonEditableTableIsManipulated_Change the hint from text', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('NonEditableTableIsManipulated_table', 'hint', 'new hint from text');
  }
}, 
{ /* ecaRule08 */
  name: 'ecaRule08',
  evts: [{ id: 'NonEditableTableIsManipulated_Change the hint from NLS', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('NonEditableTableIsManipulated_table', 'hint', '%nls.testtable/nonEditTableHint');
  }
}, 
{ /* ecaRule09 */
  name: 'ecaRule09',
  evts: [{ id: 'NonEditableTableIsManipulated_Change the CSS', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('NonEditableTableIsManipulated_table', 'class', 'customStyle');
  }
}];
dojo.addOnLoad(function(){
  engine.registerRules(NonEditableTableIsManipulated);
});