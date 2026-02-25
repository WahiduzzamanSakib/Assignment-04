let interviewList = [];
let rejectedList = [];
let currentStatus = "all";


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
    console.log(currentStatus)

    selected.classList.remove('bg-gray-200', 'text-black')
    selected.classList.add('bg-blue-500', 'text-white')

    if (id == "interview") {
        jobs.classList.add("hidden")
        filterSection.classList.remove("hidden")
        renderInterview()
    }
    else if (id == "all") {
        jobs.classList.remove("hidden")
        filterSection.classList.add("hidden")

    }
    else if (id == "rejected") {
        jobs.classList.add("hidden")
        filterSection.classList.remove("hidden")
        renderRejected()
    }
}
function setStatusColor(statusBtn, status) {
    statusBtn.classList.remove(
        'bg-gray-200', 'text-gray-600',
        'bg-green-200', 'text-green-600',
        'bg-red-200', 'text-red-600'
    );
    if (status === "interview") statusBtn.classList.add('bg-green-200', 'text-green-600');
    else if (status === "Rejected") statusBtn.classList.add('bg-red-200', 'text-red-600');
    else statusBtn.classList.add('bg-gray-200', 'text-gray-600');
}

mainContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains('job-interview')) {
        const parentNode = event.target.parentNode.parentNode;

        const company = parentNode.querySelector('.company').innerText;
        const position = parentNode.querySelector('.position').innerText;
        const location = parentNode.querySelector('.location').innerText;
        const type = parentNode.querySelector('.type').innerText;
        const status = parentNode.querySelector('.status').innerText
        const notes = parentNode.querySelector('.notes').innerText;

        parentNode.querySelector(".status").innerText = "interview"
        let statusBtn = parentNode.querySelector(".status");
        setStatusColor(statusBtn, "interview");

        const cardInfo = {
            company,
            position,
            location,
            type,
            status: "interview",
            notes,
        }

        const plantExist = interviewList.find(item => item.company == cardInfo.company)

        if (!plantExist) {
            interviewList.push(cardInfo)
        }

        rejectedList = rejectedList.filter(item => item.company != cardInfo.company);


        if (currentStatus === "rejected") {
            renderRejected();
        } else if (currentStatus === "interview") {
            renderInterview();
        }
       
        const allCards = jobs.children;
        for (let card of allCards) {
            const companyName = card.querySelector('.company').innerText;
            if (companyName === company) {
                const statusBtnMain = card.querySelector('.status');
                statusBtnMain.innerText = "interview";
                setStatusColor(statusBtnMain, "interview");
                break;
            }
        }
        calculateCount()
    }
    else if (event.target.classList.contains('job-rejected')) {
        const parentNode = event.target.parentNode.parentNode;

        const company = parentNode.querySelector('.company').innerText;
        const position = parentNode.querySelector('.position').innerText;
        const location = parentNode.querySelector('.location').innerText;
        const type = parentNode.querySelector('.type').innerText;
        const status = parentNode.querySelector('.status').innerText
        const notes = parentNode.querySelector('.notes').innerText;

        parentNode.querySelector(".status").innerText = "Rejected"
        let statusBtn = parentNode.querySelector(".status");
        setStatusColor(statusBtn, "rejected");

        const cardInfo = {
            company,
            position,
            location,
            type,
            status: "Rejected",
            notes,
        }

        const plantExist = rejectedList.find(item => item.company == cardInfo.company)

        if (!plantExist) {
            rejectedList.push(cardInfo)
        }

        interviewList = interviewList.filter(item => item.company != cardInfo.company)

        if (currentStatus == 'interview') {
            renderInterview()
        }
       
        const allCards = jobs.children;
        for (let card of allCards) {
            const companyName = card.querySelector('.company').innerText;
            if (companyName === company) {
                const statusBtnMain = card.querySelector('.status');
                statusBtnMain.innerText = "Rejected";
                setStatusColor(statusBtnMain, "Rejected");
                break;
            }
        }
        calculateCount()
    }
    // delete button
    else if (event.target.classList.contains('delete-btn')) {
        const parentNode = event.target.parentNode.parentNode;
        const company = parentNode.querySelector('.company').innerText;

        interviewList = interviewList.filter(item => !(item.company === company));
        rejectedList = rejectedList.filter(item => !(item.company === company));

        if (jobs.contains(parentNode)) {
            parentNode.remove();
        }

        if (currentStatus === "interview") {
            renderInterview();
        }
        else if (currentStatus === "rejected") {
            renderRejected();
        }

        calculateCount();
    }
});


function renderInterview() {
    filterSection.innerHTML = "";

    if (interviewList.length === 0) {
        filterSection.innerHTML = `
            <div class="flex flex-col items-center justify-center mt-10">
                <img src="jobs.png" alt="No Jobs" class="w-20 h-20 mb-4">
                <p class="text-gray-800 text-xl">No jobs available</p>
                <p class="text-gray-500 text-lg">Check back soon for new job opportunities</p>
            </div>
        `;
        return;
    }

    for (let interview of interviewList) {

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
        let statusBtn = div.querySelector('.status');
        setStatusColor(statusBtn, interview.status);

        filterSection.appendChild(div);
    }
}

function renderRejected() {
    filterSection.innerHTML = "";
    if (rejectedList.length === 0) {
        filterSection.innerHTML = `
            <div class="flex flex-col items-center justify-center mt-10">
                <img src="jobs.png" alt="No Jobs" class="w-20 h-20 mb-4">
                <p class="text-gray-800 text-xl">No jobs available</p>
                <p class="text-gray-500 text-lg">Check back soon for new job opportunities</p>
            </div>
        `;
        return;
    }
    for (let rejected of rejectedList) {


        let div = document.createElement("div")
        div.className = 'flex justify-between  border-none p-6  bg-gray-100 mt-3'
        div.innerHTML = `
                <div>
                    <h1 class="company text-blue-900 font-bold text-xl mb-3">${rejected.company}</h1>
                    <p class="position text-gray-600 mb-3 text-xl">${rejected.position}</p>
                    <p class="location text-gray-600 mb-3">${rejected.location}</p>
                    <p class="type text-gray-600 mb-3">
                        ${rejected.type}</p>

                    <button class="status bg-gray-200 p-1 font-bold rounded-md mb-3 text-gray-600">${rejected.status}</button>
                    <p class="notes text-gray-600 mb-5">${rejected.notes}</p>
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
        let statusBtn = div.querySelector('.status');
        setStatusColor(statusBtn, rejected.status);

        filterSection.appendChild(div);
    }
}