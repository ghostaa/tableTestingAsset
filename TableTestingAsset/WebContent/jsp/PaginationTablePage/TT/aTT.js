window.aTT = [{ /* ecaRule */
  name: 'ecaRule',
  evts: [{ id: 'aTT_tableTT', e: 'onSelected'}],
  onTrue: function(e) {
    this.setPW('aTT_label', 'text', this.runWF('aTT_tableTT', 'getValueInFirstSelectedItem', 'AccountName'));
  }
}, 
{ /* ecaRule01 */
  name: 'ecaRule01',
  evts: [{ id: 'aTT_tableTT', e: 'onFocus'}],
  onTrue: function(e) {
    this.setPW('aTT_label01', 'text', 'table');
  }
}, 
{ /* ecaRule02 */
  name: 'ecaRule02',
  evts: [{ id: 'aTT_link', e: 'onFocus'}],
  onTrue: function(e) {
    this.setPW('aTT_label01', 'text', 'lable111');
  }
}];
dojo.addOnLoad(function(){
  engine.registerRules(aTT);
});