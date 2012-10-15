window.EditableTableSelectCombo = [{ /* ecaRule */
  name: 'ecaRule',
  evts: [{ id: 'EditableTableSelectCombo_visible', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('EditableTableSelectCombo_table', 'visibility', 'visible');
  }
}, 
{ /* ecaRule01 */
  name: 'ecaRule01',
  evts: [{ id: 'EditableTableSelectCombo_hidden', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('EditableTableSelectCombo_table', 'visibility', 'hidden');
  }
}, 
{ /* ecaRule02 */
  name: 'ecaRule02',
  evts: [{ id: 'EditableTableSelectCombo_gone', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('EditableTableSelectCombo_table', 'visibility', 'gone');
  }
}, 
{ /* ecaRule03 */
  name: 'ecaRule03',
  evts: [{ id: 'EditableTableSelectCombo_disabletrue', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('EditableTableSelectCombo_table', 'disabled', true);
  }
}, 
{ /* ecaRule04 */
  name: 'ecaRule04',
  evts: [{ id: 'EditableTableSelectCombo_disablefalse', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('EditableTableSelectCombo_table', 'disabled', false);
  }
}, 
{ /* ecaRule05 */
  name: 'ecaRule05',
  evts: [{ id: 'EditableTableSelectCombo_readonlytrue', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('EditableTableSelectCombo_table', 'readOnly', true);
  }
}, 
{ /* ecaRule06 */
  name: 'ecaRule06',
  evts: [{ id: 'EditableTableSelectCombo_readonlyfalse', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('EditableTableSelectCombo_table', 'readOnly', false);
  }
}, 
{ /* ecaRule07 */
  name: 'ecaRule07',
  evts: [{ id: 'EditableTableSelectCombo_table', e: 'onFocus'}]
}, 
{ /* ecaRule08 */
  name: 'ecaRule08',
  evts: [{ id: 'EditableTableSelectCombo_Change the hint from text', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('EditableTableSelectCombo_table', 'hint', 'new hint from text');
  }
}, 
{ /* ecaRule09 */
  name: 'ecaRule09',
  evts: [{ id: 'EditableTableSelectCombo_Change the hint from NLS', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('EditableTableSelectCombo_table', 'hint', '%nls.testtable/EditTableHint');
  }
}, 
{ /* ecaRule10 */
  name: 'ecaRule10',
  evts: [{ id: 'EditableTableSelectCombo_Change the CSS', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('EditableTableSelectCombo_table', 'class', 'customStyle');
  }
}];
dojo.addOnLoad(function(){
  engine.registerRules(EditableTableSelectCombo);
});