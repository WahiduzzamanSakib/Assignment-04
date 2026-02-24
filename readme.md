### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Answer: 

getElementsById: its an unique element. Its call by using id.

    Ex:
      <P id="dash">Bangladash<P>
      document.getElementById("dash")

getElementsByClassName: Its an elements here you can get many element using same class name .
  Ex:

    <p class = "country">Bangladash<p> 
    <p class = "country">USA<p> 

     document.getElementByClass("country")

querySelector: css selector for first element.  
        Ex: 
         

        document.getElementByClass(".country")  
    output: Bangladash

querySelectorAll: You can use diffrent  ways to get element or elements.
                like : to get getElementById, getElementsByClassName, and querySelector / querySelectorAll. 


<!-- ------------------------- -->

### 2. How do you create and insert a new element into the DOM?
Answer: 
     const div = document.createElement("div"); 
       div.innerText = "Bangladash";             
       document.body.appendChild(div);  

<!-- ------------------------- -->

### 3. What is Event Bubbling? And how does it work?
Answer: 
    Event Bubbling in an element of DOM . It works like a tree.
    Ex: 
           p --> div --> body --> html --> document
<!-- ------------------------- -->

### 4. What is Event Delegation in JavaScript? Why is it useful?
Answer: 
Event Delegation is pattern in JavaScript to handling dynamic elements for better performance.
<!-- ------------------------- -->

### 5. What is the difference between preventDefault() and stopPropagation() methods?
Answer: 

     preventDefault() : Stops default browser behavior.
     stopPropagation() : Stops event bubbling
<!-- ------------------------- -->
