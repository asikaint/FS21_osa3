(this.webpackJsonppuhelinluetteloo=this.webpackJsonppuhelinluetteloo||[]).push([[0],{23:function(e,n,t){},44:function(e,n,t){"use strict";t.r(n);var c=t(1),r=t.n(c),o=t(18),a=t.n(o),u=(t(23),t(9)),i=t(4),l=t(0),s=function(e){var n=e.newFilter,t=e.handleFilterChange;return Object(l.jsx)("div",{children:Object(l.jsx)("form",{children:Object(l.jsxs)("div",{children:[" filter shown with:",Object(l.jsx)("input",{value:n,onChange:t})]})})})},d=function(e){var n=e.addName,t=e.newName,c=e.handleNameChange,r=e.newNumber,o=e.handleNumberChange;return Object(l.jsxs)("form",{onSubmit:n,children:[Object(l.jsxs)("div",{children:[" name:",Object(l.jsx)("input",{value:t,onChange:c})]}),Object(l.jsxs)("div",{children:[" number:",Object(l.jsx)("input",{value:r,onChange:o})]}),Object(l.jsx)("button",{type:"submit",children:"add"})]})},j=t(3),b=t.n(j),h=function(e){var n=e.person,t=e.removePerson;return Object(l.jsxs)("li",{children:[n.name,": ",n.number," "," ",Object(l.jsx)("button",{onClick:t,children:"remove"})]})},m="http://localhost:3001/persons",f=function(){return b.a.get(m).then((function(e){return e.data}))},O=function(e){return b.a.post(m,e).then((function(e){return e.data}))},v=function(e){return console.log("removed ",e),b.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},p=function(e){var n=e.message;return null===n?null:Object(l.jsxs)("div",{style:{color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},children:[Object(l.jsx)("br",{}),Object(l.jsx)("em",{children:n})]})},g=function(){var e=Object(c.useState)([]),n=Object(i.a)(e,2),t=n[0],r=n[1],o=Object(c.useState)(""),a=Object(i.a)(o,2),j=a[0],b=a[1],m=Object(c.useState)(""),g=Object(i.a)(m,2),x=g[0],w=g[1],C=Object(c.useState)(""),N=Object(i.a)(C,2),y=N[0],S=N[1],k=Object(c.useState)(""),F=Object(i.a)(k,2),L=F[0],P=F[1];Object(c.useEffect)((function(){f().then((function(e){r(e)}))}),[]);var R,T;if(y.length>0)var B=Object(u.a)((R=t.map((function(e){return e})),T=y,R.filter((function(e){return e.name.toLowerCase().includes(T)}))));else B=Object(u.a)(t);return Object(l.jsxs)("div",{children:[Object(l.jsx)(p,{message:L}),Object(l.jsx)("h2",{children:"Phonebook"}),Object(l.jsx)(s,{newFilter:y,handleFilterChange:function(e){S(e.target.value)}}),Object(l.jsx)("h3",{children:"add a new number"}),Object(l.jsx)(d,{addName:function(e){var n={name:j,number:x};e.preventDefault();var c=t.map((function(e){return e.name.toLocaleLowerCase()})),o=t.map((function(e){return e.number}));c.includes(j.toLowerCase())?window.alert("".concat(j," is already added to phonebook")):o.includes(x)?window.alert("".concat(x," is already added to phonebook")):O(n).then((function(e){r(t.concat(e)),b(""),w(""),P("Added ".concat(e.name)),setTimeout((function(){P(null)}),3e3)}))},newName:j,handleNameChange:function(e){b(e.target.value)},newNumber:x,handleNumberChange:function(e){w(e.target.value)}}),Object(l.jsx)("h3",{children:"Numbers"}),Object(l.jsx)("ul",{children:B.map((function(e){return Object(l.jsx)(h,{person:e,removePerson:function(){return function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Remove ".concat(n.name," "))&&v(n.id).then((function(c){P("Removed ".concat(n.name)),setTimeout((function(){P(null)}),3e3),r(t.filter((function(n){return n.id!==e})))})).catch((function(e){P("the note '".concat(n.name,"': '").concat(n.number,"' was already deleted from server")),setTimeout((function(){P(null)}),3e3)}))}(e.id)}},e.id)}))})]})},x=b.a.get("https://stormy-hamlet-74653.herokuapp.com/");console.log(x),a.a.render(Object(l.jsx)(r.a.StrictMode,{children:Object(l.jsx)(g,{})}),document.getElementById("root"))}},[[44,1,2]]]);
//# sourceMappingURL=main.e8690851.chunk.js.map