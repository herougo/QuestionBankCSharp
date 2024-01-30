import authService from "../components/api-authorization/AuthorizeService";


async function authorizedGetFetch(fetchUrl) {
    const token = await authService.getAccessToken();
    const response = await fetch(fetchUrl, {
        headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    })
    const data = await response.json();
    return [response.status, data]
}

async function authorizedPostFetch(fetchUrl, body) {
    const token = await authService.getAccessToken()
    let headers = !token ? {} : { 'Authorization': `Bearer ${token}` }
    headers = {
        ...headers,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    const response = await fetch(fetchUrl, {
        headers: headers,
        method: "POST",
        body: JSON.stringify(body)
    });
    let responseData = {}
    if (response.status === 200) {
        try {
            responseData = await response.json();
        } catch { }
    }
    return [response.status, responseData]
}


async function getFilteredQuestions(body, callback) {
    let [status, data] = await authorizedPostFetch('questions/filtered', body)
    data = data.map(
        question => ({
            id: question.id,
            questionText: question.questionText,
            done: question.done,
            tags: question.tags || [],
            courses: question.courses || []
        })
    )
    callback(data)
}

async function createQuestion(data, callback) {
    const payload = {
        "QuestionText": data.question || "",
        "AnswerText": data.answer || "",
        "Courses": data.courses || [],
        "Tags": data.tags || [],
    }
    const [status, responseData] = await authorizedPostFetch('questions/create', payload)
    callback(status, responseData)
}

async function createTag(data, callback) {
    const payload = {
        "Name": data.name || "",
        "Description": data.description || ""
    }
    const [status, responseData] = await authorizedPostFetch('tags/create', payload)
    callback(status, responseData)
}

async function createCourse(data, callback) {
    const payload = {
        "Code": data.code || "",
        "Title": data.title || ""
    }
    const [status, responseData] = await authorizedPostFetch('courses/create', payload)
    callback(status, responseData)
}

async function toggleDone(questionId, newValue, callback) {
    let status, responseData
    if (newValue) {
        [status, responseData] = await authorizedPostFetch('questions/markasdone/' + questionId, {})
    } else {
        [status, responseData] = await authorizedPostFetch('questions/markasnotdone/' + questionId, {})
    }
    callback(status, responseData)
}

function listOfObjToMap(listOfObj, keyKey, valueKey) {
    // e.g. [{id: 1, val: "hi"}], id, val -> {1: "hi"}
    const result = {}
    for (const element of listOfObj) {
        result[element[keyKey]] = element[valueKey]
    }
    return result
}

async function getTagsAndCourses(unusedBody, callback) {
    // TODO: do in parallel
    const [coursesStatus, coursesData] = await authorizedGetFetch('courses')
    const [tagsStatus, tagsData] = await authorizedGetFetch('tags')
    callback({
        courses: listOfObjToMap(coursesData, "code", "id"),
        tags: listOfObjToMap(tagsData, "name", "id") 
    })
}

export {
    getFilteredQuestions,
    createQuestion,
    createTag,
    createCourse,
    toggleDone,
    getTagsAndCourses
}