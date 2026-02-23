let interviewList = [];
let rejectedList = [];


let total = document.getElementById("total-count");
let interviewCount = document.getElementById("interview-count");
let rejectedCount = document.getElementById("rejected-count");
const filterSection = document.getElementById("filtered-section")

const jobs = document.getElementById("allJobs");
const tabCount = document.getElementById("tab-count");

function calculateCount() {
    total.innerText = jobs.children.length;
    tabCount.innerText = jobs.children.length;
   interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}
calculateCount();

const mainContainer = document.querySelector("main")
console.log(mainContainer)


const allBtn = document.getElementById("all");
const interviewBtn = document.getElementById("interview");
const rejectedBtn = document.getElementById("rejected");

function toggleStyle(id) {

    allBtn.classList.add('bg-gray-200', 'text-black')
    interviewBtn.classList.add('bg-gray-200', 'text-black')
    rejectedBtn.classList.add('bg-gray-200', 'text-black')

    allBtn.classList.remove('bg-blue-500', 'text-white')
    interviewBtn.classList.remove('bg-blue-500', 'text-white')
    rejectedBtn.classList.remove('bg-blue-500', 'text-white')

    const selected = document.getElementById(id)
    currentStatus = id

    selected.classList.remove('bg-gray-200', 'text-black')
    selected.classList.add('bg-blue-500', 'text-white')

    if (id == "interview") {
        jobs.classList.add("hidden")
        filterSection.classList.remove("hidden")
        interviewInfo()
    } else {
        jobs.classList.remove("hidden")
        filterSection.classList.add("hidden")
    }
}

mainContainer.addEventListener("click", function (event) {

    console.log(event.target.classList.contains("job-interview"))

    if (event.target.classList.contains("job-interview")) {
        const parentNode = event.target.parentNode.parentNode;

        const company = parentNode.querySelector('.company').innerText
        const position = parentNode.querySelector('.position').innerText
        const location = parentNode.querySelector('.location').innerText
        const type = parentNode.querySelector('.type').innerText
        const status = parentNode.querySelector('.status').innerText
        const notes = parentNode.querySelector('.notes').innerText

         parentNode.querySelector(".status").innerText = "interview"

        const cardInfo = {
            company,
            position,
            location,
            type,
            status:"interview",
            notes,
        }

        const plantExist = interviewList.find(item => item.company === cardInfo.company)
       
        if (!plantExist) {
            interviewList.push(cardInfo)
        }
        interviewInfo()
    }
})

function interviewInfo() {
    filterSection.innerHTML = "";

    for (let interview of interviewList) {
        console.log(interview)

        let div = document.createElement("div")
        div.className = 'flex justify-between  border-none p-6  bg-gray-100 mt-3'
        div.innerHTML = `
                <div>
                    <h1 class="company text-blue-900 font-bold text-xl mb-3">${interview.company}</h1>
                    <p class="position text-gray-600 mb-3 text-xl">${interview.position}</p>
                    <p class="location text-gray-600 mb-3">${interview.location}</p>
                    <p class="type text-gray-600 mb-3">
                        ${interview.type}</p>

                    <button class="status bg-gray-200 p-1 font-bold rounded-md mb-3 text-gray-600">${interview.status}</button>
                    <p class="notes text-gray-600 mb-5">${interview.notes}</p>
                    <div>
                        <button
                            class="job-interview border border-green-400 text-green-400 p-2 font-bold rounded-md cursor-pointer">interview</button>
                        <button
                            class="job-rejected border border-red-500 text-red-500 p-2 font-bold rounded-md cursor-pointer">Rejected</button>
                    </div>
                </div>
                <div class="bg-gray-200 rounded-full p-2 h-10 cursor-pointer">
                    <i class="fa-solid fa-trash-can delete-btn"></i>
                </div>
                `
        filterSection.appendChild(div);
    }
}


 