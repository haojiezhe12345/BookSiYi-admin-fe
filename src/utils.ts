export function timeArr2ISOStr(timeArr: any) {
    var obj: any[] = JSON.parse(JSON.stringify(timeArr))
    obj[1]--
    var year = obj[0]
    obj.splice(0, 1)
    return new Date(Date.UTC(year, ...obj)).toISOString().slice(0, 19)
}

export function timeArr2HumanStr(timeArr: any) {
    try {
        var obj: any[] = JSON.parse(JSON.stringify(timeArr))
        obj[1]--
        var year = obj[0]
        obj.splice(0, 1)
        return new Date(Date.UTC(year, ...obj)).toISOString().slice(0, 19).replace('T', ' ')
    } catch (error) {
        return 'error'
    }
}

export function uploadFileAndGetUrl() {
    
}
