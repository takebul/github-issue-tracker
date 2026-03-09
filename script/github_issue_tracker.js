let openCount = 0;
let closedCount = 0;

const allCount = document.getElementById("count");

const allBtnSection = document.getElementById("all-btn");
const openBtnSection = document.getElementById("open-btn");
const closedBtnSection = document.getElementById("closed-btn");

const allIssuesContainer = document.getElementById("all-issues-container");
const openIssuesContainer = document.getElementById("open-issues-container");
const closedIssueContainer = document.getElementById("closed-issues-container");

const buttons = document.querySelectorAll(".btn");

const sections = {
    "all-btn": document.getElementById("all-issues-container"),
    "open-btn": document.getElementById("open-issues-container"),
    "closed-btn": document.getElementById("closed-issues-container"),
};

buttons.forEach((btn) => {
    console.log(btn);

    btn.addEventListener("click", () => {
        buttons.forEach(button => button.classList.remove("btn-active"));

        btn.classList.add("btn-active");

        Object.values(sections).forEach(section => section.classList.add("hidden"));

        sections[btn.id]?.classList?.remove("hidden");

        if (btn.getAttribute("id") == "open-btn") {
            allCount.innerText = `${openCount}`
        }

        if (btn.getAttribute("id") == "closed-btn") {
            allCount.innerText = `${closedCount}`
        }
        if (btn.getAttribute("id") == "all-btn") {
            allCount.innerText = `${50}`
        }
    });
});

const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("issues-container").classList.add("hidden");
    } else {
        document.getElementById("issues-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

const loadAllIssues = async () => {
    manageSpinner(true)
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const data = await res.json();
    displayAllIssues(data.data);
}

// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }

const displayAllIssues = (issues) => {
    console.log(issues.length);
    allIssuesContainer.innerHTML = "";

    allCount.innerText = `${issues.length}`
    issues.forEach(issue => {
        console.log(issue.status);
        const addAllIssue = document.createElement("div");
        addAllIssue.innerHTML = `
                ${issue.status == "open" ? `<section class="bg-white p-3.5 rounded-md border-t-4 border-t-green-500 space-y-3">` : `<section class="bg-white p-3.5 rounded-md border-t-4 border-t-purple-500 space-y-3">`}
                
                <div class="flex justify-between">
                <div id="status">${issue.status == "open" ? `<img src="./assets/Open-Status.png" alt=""></img>` : `<img src="./assets/Closed- Status .png" alt="">`}
                
                </div>
                <div>
                <button class="btn ${issue.priority === "high"
                ? "bg-red-200 text-red-500 border-2 rounded-full px-3 py-0.5 font-medium"
                : issue.priority === "medium"
                    ? "bg-yellow-200 text-yellow-600 border-2 rounded-full px-3 py-0.5 font-medium"
                    : "bg-gray-200 text-gray-500 border-2 rounded-full px-3 py-0.5 font-medium"}">
                ${issue.priority}
                </button>
                </div>
                </div>
                
                <div class="space-y-3">
                <h4 onclick="loadIssuesDetails(${issue.id})" class="text-2xl font-semibold">${issue.title}</h4>
                <p class="text-gray-500 font-medium">${issue.description}</p>
                
                <div class="flex gap-2">
                <button class="btn bg-red-100 text-red-500 px-3 py-2 rounded-full"><i
                class="fa-solid fa-bug"></i>
                ${issue.labels[0]}</button>
                <button class="btn bg-amber-100 text-amber-500 px-3 py-2 rounded-full"><i
                class="fa-regular fa-life-ring"></i>
                ${issue.labels[1] == undefined ? "Not Found" : issue.labels[1]}</button>
                </div>
                
                </div>
                
                <hr class="text-gray-300 divider h-0.5 my-5">
                
                <div class="flex justify-between text-gray-500">
                <div class="space-y-2">
                <p>${issue.author}</p>
                <p>Assignee: ${issue.assignee}</p>
                </div>
                
                <div class="space-y-2 text-right">
                <p>${issue.createdAt}</p>
                <p>Updated: ${issue.updatedAt}</p>
                </div>
                </div>
                
                </section>
                `;
        allIssuesContainer.append(addAllIssue);

        // manageSpinner(false);

        if (issue.status === "open") {
            openCount++;
            // openIssuesContainer.innerHTML = "";
            const addOpenIssue = document.createElement("div");
            addOpenIssue.innerHTML = `
                ${issue.status == "open" ? `<section class="bg-white p-3.5 rounded-md border-t-4 border-t-green-500 space-y-3">` : `<section class="bg-white p-3.5 rounded-md border-t-4 border-t-purple-500 space-y-3">`}
                
                <div class="flex justify-between">
                <div id="status">${issue.status == "open" ? `<img src="./assets/Open-Status.png" alt=""></img>` : `<img src="./assets/Closed- Status .png" alt="">`}
                
                </div>
                <div>
                <button class="btn ${issue.priority === "high"
                    ? "bg-red-200 text-red-500 border-2 rounded-full px-3 py-0.5 font-medium"
                    : issue.priority === "medium"
                        ? "bg-yellow-200 text-yellow-600 border-2 rounded-full px-3 py-0.5 font-medium"
                        : "bg-gray-200 text-gray-500 border-2 rounded-full px-3 py-0.5 font-medium"}">
                ${issue.priority}
                </button>
                </div>
                </div>
                
                <div class="space-y-3">
                <h4 onclick="loadIssuesDetails(${issue.id})" class="text-2xl font-semibold">${issue.title}</h4>
                <p class="text-gray-500 font-medium">${issue.description}</p>
                
                <div class="flex gap-2">
                <button class="btn bg-red-100 text-red-500 px-3 py-2 rounded-full"><i
                class="fa-solid fa-bug"></i>
                ${issue.labels[0]}</button>
                <button class="btn bg-amber-100 text-amber-500 px-3 py-2 rounded-full"><i
                class="fa-regular fa-life-ring"></i>
                ${issue.labels[1] == undefined ? "Not Found" : issue.labels[1]}</button>
                </div>
                
                </div>
                
                <hr class="text-gray-300 divider h-0.5 my-5">
                
                <div class="flex justify-between text-gray-500">
                <div class="space-y-2">
                <p>${issue.author}</p>
                <p>Assignee: ${issue.assignee}</p>
                </div>
                
                <div class="space-y-2 text-right">
                <p>${issue.createdAt}</p>
                <p>Updated: ${issue.updatedAt}</p>
                </div>
                </div>
                
                </section>
                `;
            openIssuesContainer.append(addOpenIssue);
            // manageSpinner(false);
        };

        if (issue.status === "closed") {
            closedCount++;
            const addClosedIssue = document.createElement("div");
            addClosedIssue.innerHTML = `
                ${issue.status == "open" ? `<section class="bg-white p-3.5 rounded-md border-t-4 border-t-green-500 space-y-3">` : `<section class="bg-white p-3.5 rounded-md border-t-4 border-t-purple-500 space-y-3">`}
                
                <div class="flex justify-between">
                <div id="status">${issue.status == "closed" ? `<img src="./assets/Closed- Status .png" alt="">` : `<img src="./assets/Open-Status.png" alt=""></img>`}
            
            </div>
            <div>
            <button class="btn ${issue.priority === "high"
                    ? "bg-red-200 text-red-500 border-2 rounded-full px-3 py-0.5 font-medium"
                    : issue.priority === "medium"
                        ? "bg-yellow-200 text-yellow-600 border-2 rounded-full px-3 py-0.5 font-medium"
                        : "bg-gray-200 text-gray-500 border-2 rounded-full px-3 py-0.5 font-medium"}">
                ${issue.priority}
                </button>
            </div>
            </div>
            
            <div class="space-y-3">
            <h4 onclick="loadIssuesDetails(${issue.id})" class="text-2xl font-semibold">${issue.title}</h4>
            <p class="text-gray-500 font-medium">${issue.description}</p>
            
                <div class="flex gap-2">
                <button class="btn bg-red-100 text-red-500 px-3 py-2 rounded-full"><i
                class="fa-solid fa-bug"></i>
                ${issue.labels[0]}</button>
                <button class="btn bg-amber-100 text-amber-500 px-3 py-2 rounded-full"><i
                class="fa-regular fa-life-ring"></i>
                ${issue.labels[1] == undefined ? "Not Found" : issue.labels[1]}</button>
                </div>
                
                </div>
                
                <hr class="text-gray-300 divider h-0.5 my-5">
                
                <div class="flex justify-between text-gray-500">
                <div class="space-y-2">
                <p>${issue.author}</p>
                <p>Assignee: ${issue.assignee}</p>
                </div>
                
                <div class="space-y-2 text-right">
                <p>${issue.createdAt}</p>
                <p>Updated: ${issue.updatedAt}</p>
                </div>
                </div>
                
                </section>
                `;
            closedIssueContainer.append(addClosedIssue);
        };
    });
    manageSpinner(false);
};

document.getElementById("search-btn").addEventListener("click", () => {
    const input = document.getElementById("search-input");
    const inputValue = input.value.trim().toLowerCase();
    console.log(inputValue);

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputValue}`)
        .then(res => res.json())
        .then(data => {
            const allIssues = data.data;
            console.log(allIssues);
            // const filterIssues = allIssues.filter(issue => issue.data.toLowerCase().includes(inputValue));
            // console.log(filterIssues);
            displayAllIssues(allIssues);
            allIssuesContainer.classList.remove("hidden");
        })
})

const loadIssuesDetails = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    displayIssueDetails(data.data)
}

const displayIssueDetails = (issue) => {
    const issueDetails = document.getElementById("issues-details");
    issueDetails.innerHTML = `
                        <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <div>
                        <h3 class="text-2xl py-2 font-bold">${issue.title}</h3>

                        <div class="flex items-center gap-7">
                            <p class=""><button ${issue.status == "open" ? `class="btn btn-active bg-green-500 text-white rounded-full ">` : `class="btn btn-active bg-red-500 text-white rounded-full ">`}
                                   ${issue.status}</button>

                            </p>
                            <li class="text-gray-500 text-lg">${issue.author}</li>
                            <li class="text-gray-500 text-lg">${issue.createdAt}</li>
                        </div>

                    </div>

                    <div class="flex gap-2">
                <button class="btn bg-red-100 text-red-500 px-3 py-2 rounded-full"><i
                class="fa-solid fa-bug"></i>
                ${issue.labels[0]}</button>
                <button class="btn bg-amber-100 text-amber-500 px-3 py-2 rounded-full"><i
                class="fa-regular fa-life-ring"></i>
                ${issue.labels[1] == undefined ? "Not Found" : issue.labels[1]}</button>
                </div>

                    <div>
                        <p class="text-gray-500 font-medium">
                            ${issue.description}
                        </p>
                    </div>

                    <div class="flex justify-between">
                        <div>
                            <p>Assignee:</p>
                            <p>${issue.assignee ? issue.assignee : "Not Assigned"}</p>
                        </div>
                        <div>
                            <p class="text-center">Priority:</p>
                            <button class="btn ${issue.priority === "high"
            ? "bg-red-200 text-red-500 border-2 rounded-full px-3 py-0.5 font-medium"
            : issue.priority === "medium"
                ? "bg-yellow-200 text-yellow-600 border-2 rounded-full px-3 py-0.5 font-medium"
                : "bg-gray-200 text-gray-500 border-2 rounded-full px-3 py-0.5 font-medium"}">
                ${issue.priority}
                </button>
                        </div>
                    </div>
                    <div class="modal-action">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn btn-primary">Close</button>
                        </form>
                    </div>
                </div>
    `;
    document.getElementById("issues_modal").showModal();
}

loadAllIssues();