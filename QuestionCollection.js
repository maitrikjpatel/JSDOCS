// 
// ##Question Collection
// ###This is a Backbone Collection for Questions

// **Question Collection Variable for instantiating the class**

var QuestionCollection = Backbone.Collection.extend({
    
    // *Data Model for each object in the collection*
    model: Question,    
    
    initialize: function() {
        console.log('initializing QuestionCollection');
    }
});

//**Test Method**

function testMethod() {
	var foo = "bar";
}


