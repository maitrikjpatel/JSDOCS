
// global
// Skill Collection
// This is a Backbone Collection for User's Skills (beginner, intermediate, advanced)

var SkillCollection = Backbone.Collection.extend({
    
    model: Skill,
    
    defaults: { },    
    
    initialize: function () {
        console.log('initializing SkillCollection');
    }

});


// Skill Collection method

function testMethod() {
	
}