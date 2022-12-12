const fakeParentChildExample = [{
    id: 1, // level 1
    name: "Asset",
    children: [{
        id: 2, // level 2
        name: "Bank",
        children: [{
            id: 5, // level 3
            name: "ABC Bank",
            children: []
        }, {
            id: 6, // level 3
            name: "Dollar Account",
            children: []
        }]
    },
    {
        id: 3, // level 2
        name: "Cash",
        children: [{
            id: 4, // level 3
            name: "Petty Cash",
            children: [
                {
                    id: 7, // level 4
                    name: "Another Wallet",
                    children: [{
                        id: 5, // level 5
                        name: "A1",
                        children: []
                    }, {
                        id: 6, // level 5
                        name: "A2",
                        children: []
                    }]
                }, {
                    id: 8, // level 4
                    name: "Simply Wallet",
                    children: []
                }
            ]
        }, {
            id: 9, // level 3
            name: "Simply Cash",
            children: [
                {
                    id: 10, // level 5
                    name: "B1",
                    children: []
                }, {
                    id: 11, // level 5
                    name: "B2",
                    children: []
                }
            ]
        }]
    }]
}]

const recursiveArray = [];
let level = 1;
let tableData = {};
const recursive = (array = fakeParentChildExample, parent = null) => {
    array.map((item, i) => {
        recursiveArray.push({ id: item.id, name: item.name, parentId: parent?.id, parentName: parent?.name, level });
        tableData = { ...tableData, [`${level}_${item.id}`]: item.name }
        if (item.children.length) {
            level++;
            recursive(item.children, { id: item?.id, name: item?.name });
        } else {
            array.length - 1 === i && --level;
        }
    })
}

recursive();

console.log(recursiveArray);
console.log(tableData);

const sortedRecursiveArray = recursiveArray.sort((a, b) => b.level - a.level);
const levelArray = [...new Set(sortedRecursiveArray.map(item => item.level))]

console.log(sortedRecursiveArray);
console.log(levelArray);

let thLevelFromBottom, levelTimer, bottomThCount = 0;
sortedRecursiveArray.map((item, i) => {
    if (i === 0) thLevelFromBottom = item.level;
    if (thLevelFromBottom === item.level && levelTimer === 0) {
        bottomThCount++;
        console.log(`<th>${item.name}</th>`);
    }
    else {

    }
})

let levelDatas = []
let cospanDatas = {}
const tableArray = levelArray.map((level, i) => {
    let tableData = {}
    const filteredSortedRecursiveArray = sortedRecursiveArray.filter(item => item.level === level);
    filteredSortedRecursiveArray.map((item, k) => {
        const childs = sortedRecursiveArray.filter(r => r.parentId === item.id);
        item.parentId && childs.length && (tableData = { ...tableData, [`${item.level}_${k}`]: childs.length });
        // console.log(levelDatas);
        // const colspan = childs.length ? `colspan='${childs.length}'` : '';
        // const rowspan = !childs.length ? `rowspan='${levelArray.length - level + 1}'` : ''
        // console.log(`<th ${level} ${colspan} ${rowspan}>${item.name}</th>`)
        if (filteredSortedRecursiveArray.length - k === 1) levelDatas.push(tableData);
    })
});

console.log(levelDatas);

levelDatas.map(item => {

})