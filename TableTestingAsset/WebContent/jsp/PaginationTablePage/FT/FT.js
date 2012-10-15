window.FT = [{ /* ecaRule */
  name: 'ecaRule',
  evts: [{ id: 'FT_tableFT', e: 'onSelected'}],
  cond: function(e) {
    return this.getPW('FT_tableFT', 'readOnly') && true;
  },
  onTrue: function(e) {
    this.runWF('FT_tableFT', 'getLengthOfSelectedRows');
  },
  onFalse: function(e) {
    this.runWF('FT_link', 'focus');
  }
}, 
{ /* ecaRule01 */
  name: 'ecaRule01',
  evts: [{ id: 'FT_tableFT', e: 'onFocus'}],
  onTrue: function(e) {
    this.runWF('FT_link02', 'focus');
  }
}];
dojo.addOnLoad(function(){
  engine.registerRules(FT);
});