export const convertMsToCorrespondingTime = (milliseconds) => {
    const seconds = 1000;
    const minutes = seconds * 60;
    const hours = minutes * 60;
    const days = hours * 24;

    let time

    if (milliseconds < seconds) {
        time = milliseconds.toFixed(0) + " milisegundos";
    } else if (milliseconds < minutes) {
        time = (milliseconds / seconds).toFixed(0) + " segundos";
    } else if (milliseconds < hours) {
        time = (milliseconds / minutes).toFixed(0) + " minutos";
    } else if (milliseconds < days) {
        time = (milliseconds / hours).toFixed(0) + " horas";
    } else {
        time = (milliseconds / days).toFixed(0) + " días";
    }

    return time
}

export const filterUsersByFullName = (users, nameToFilterOn) => {
    const filteredUsers = users.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`
        return fullName.includes(nameToFilterOn)
    })
    return filteredUsers
}