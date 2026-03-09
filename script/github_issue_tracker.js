const allCount = document.getElementById("all-btn-count");
const openCount = document.getElementById("open-btn-count");
const closedCount = document.getElementById("closed-btn-count");

const allBtnSection = document.getElementById("all-btn");
const openBtnSection = document.getElementById("open-btn");
const closedBtnSection = document.getElementById("closed-btn");

const allIssuesContainer = document.getElementById("issues-container");

function calculateCount() {
    allCount.innerText = allIssuesContainer.children.length;
    openCount.innerText = allIssuesContainer.children.length;
    closedCount.innerText = allIssuesContainer.children.length;
}


const loadAllIssues = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
        .then(res => res.json())
        .then(data => displayAllIssues(data.data))
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
    allIssuesContainer.innerHTML = "";
    issues.forEach(issue => {
        console.log(issue.labels);
        const addIssue = document.createElement("div");
        addIssue.innerHTML = `
                <section class="bg-white p-3.5 rounded-md border-t-4 border-t-green-500 space-y-3">
                <div class="flex justify-between">
                <div id="status">${issue.status == closed ? `<img src="./assets/Closed- Status .png" alt="">` : `<img src="./assets/Open-Status.png" alt=""></img>`}
                
                </div>
                <div>
                <button id="level"
                class="btn bg-red-200 text-red-500 border-2 rounded-full px-3 text-center py-0.5 font-medium">
                ${issue.priority}</button>
                </div>
                </div>
                
                <div class="space-y-3">
                <h4 class="text-2xl font-semibold">${issue.title}</h4>
                <p class="text-gray-500 font-medium">${issue.description}</p>
                
                <div class="flex gap-2">
                <button class="btn bg-red-100 text-red-500 px-3 py-2 rounded-full"><i
                class="fa-solid fa-bug"></i>
                ${issue.labels[0]}</button>
                <button class="btn bg-amber-100 text-amber-500 px-3 py-2 rounded-full"><i
                class="fa-regular fa-life-ring"></i>
                ${issue.labels[1]}</button>
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
        allIssuesContainer.append(addIssue);
        calculateCount();
    });
}



loadAllIssues();