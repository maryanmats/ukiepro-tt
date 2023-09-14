import { Data } from "../types/types";

function getNewId(items: Data[]) {
  const itemIds = items.map((item) => item.id);
  return Math.max(...itemIds) + 1;
}

function editObjectById(arr: Data[], newData: Data) {
  const index = arr.findIndex((item) => item.id === newData.id);

  const newArr = [...arr];

  if (index !== -1) {
    newArr[index] = { ...arr[index], ...newData };
  } else {
    console.log('Object with ID not found!');
  }

  return newArr;
}

export { getNewId, editObjectById };