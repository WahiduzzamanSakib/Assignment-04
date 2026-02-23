let interviewList = [];
let rejectedList = [];


let total = document.getElementById("total-count");
let interviewCount = document.getElementById("interview-count");
let rejectedCount = document.getElementById("rejected-count");


const jobs = document.getElementById("allJobs");
const tabCount = document.getElementById("tab-count");

function calculateCount() {
    total.innerText = jobs.children.length;
    tabCount.innerText = jobs.children.length;
    const filterSection = document.getElementById("filtered-section")
}
calculateCount();