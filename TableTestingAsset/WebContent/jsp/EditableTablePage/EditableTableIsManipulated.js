window.EditableTableIsManipulated = [{ /* ecaRule */
  name: 'ecaRule',
  evts: [{ id: 'EditableTableIsManipulated_visible', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('EditableTableIsManipulated_table', 'visibility', 'visible');
  }
}, 
{ /* ecaRule01 */
  name: 'ecaRule01',
  evts: [{ id: 'EditableTableIsManipulated_hidden', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('EditableTableIsManipulated_table', 'visibility', 'hidden');
  }
}, 
{ /* ecaRule02 */
  name: 'ecaRule02',
  evts: [{ id: 'EditableTableIsManipulated_gone', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('EditableTableIsManipulated_table', 'visibility', 'gone');
  }
}, 
{ /* ecaRule03 */
  name: 'ecaRule03',
  evts: [{ id: 'EditableTableIsManipulated_disabletrue', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('EditableTableIsManipulated_table', 'disabled', true);
  }
}, 
{ /* ecaRule04 */
  name: 'ecaRule04',
  evts: [{ id: 'EditableTableIsManipulated_disablefalse', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('EditableTableIsManipulated_table', 'disabled', false);
  }
}, 
{ /* ecaRule05 */
  name: 'ecaRule05',
  evts: [{ id: 'EditableTableIsManipulated_readonlytrue', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('EditableTableIsManipulated_table', 'readOnly', true);
  }
}, 
{ /* ecaRule06 */
  name: 'ecaRule06',
  evts: [{ id: 'EditableTableIsManipulated_readonlyfalse', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('EditableTableIsManipulated_table', 'readOnly', false);
  }
}, 
{ /* ecaRule07 */
  name: 'ecaRule07',
  evts: [{ id: 'EditableTableIsManipulated_table', e: 'onFocus'}]
}, 
{ /* ecaRule08 */
  name: 'ecaRule08',
  evts: [{ id: 'EditableTableIsManipulated_Change the hint from text', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('EditableTableIsManipulated_table', 'hint', 'new hint from text');
  }
}, 
{ /* ecaRule09 */
  name: 'ecaRule09',
  evts: [{ id: 'EditableTableIsManipulated_Change the hint from NLS', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('EditableTableIsManipulated_table', 'hint', '%nls.testtable/EditTableHint');
  }
}, 
{ /* ecaRule10 */
  name: 'ecaRule10',
  evts: [{ id: 'EditableTableIsManipulated_Change the CSS', e: 'onClick'}],
  onTrue: function(e) {
    this.setPW('EditableTableIsManipulated_table', 'class', 'customStyle');
  }
}];
dojo.addOnLoad(function(){
  engine.registerRules(EditableTableIsManipulated);
});