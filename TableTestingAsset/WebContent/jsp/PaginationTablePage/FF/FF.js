window.FF = [{ /* ecaRule */
  name: 'ecaRule',
  evts: [{ id: 'FF_tableFF', e: 'onMouseUp'}],
  cond: function(e) {
    return this.getPW('FF_tableFF', 'readOnly');
  },
  onTrue: function(e) {
    this.setPW('FF_tableFF', 'disabled', '%nls.testtable/AccountTypeValue');
  }
}];
dojo.addOnLoad(function(){
  engine.registerRules(FF);
});