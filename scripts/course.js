const courseList = document.querySelector("#course-list");
const creditTotal = document.querySelector("#course-credits");
const filters =document.querySelectorAll(".course-filter");

let courses = [];

function displayCourses(subject) {
    const visible = subject === "all"
        ? courses
        : courses.filter(course => course.subject === subject);

    courseList.innerHTML = "";
    visible.forEach(course => {
        const item = document.createElement("a");
        item.textContent = `${course.subject} ${course.number}`;
        item.title = course.name;
        if (course.url) item.href = course.url;
        courseList.appendChild(item);
    });

    const totalCredits = visible.reduce((sum, course) => sum + course.credits, 0);
    creditTotal.textContent = `The total credits for course listed above is ${totalCredits}`;
}

async function loadCourses() {
    try {
        const response = await fetch("data/courses.json");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        courses = await response.json();
        displayCourses("all");
    } catch (error) {
        console.error("Could not load courses:", error);
        courseList.textContent = "Courses are unavailable right now.";
    }
}

filters.forEach(filter => {
    filter.addEventListener("click", () => {
        displayCourses(filter.id.replace("course-", ""));
    });
});

loadCourses();
