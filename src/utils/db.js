import mongoose from "mongoose"

const connection = {}

async function connect() {
  if (connection.isConnected) {
    // console.log('already connected');
    return
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState
    if (connection.isConnected === 1) {
      // console.log('use previous connection');
      return
    }
    await mongoose.disconnect()
  }
  const db = await mongoose.connect(process.env.MONGODB_URI)
  // console.log('new connection');
  connection.isConnected = db.connections[0].readyState
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect()
      connection.isConnected = false
    } else {
      // console.log('not disconnected');
    }
  }
}
function convertDocToObj(doc) {
  // Base case: if object is null or undefined, return it as is
  if (!doc) {
    return doc
  }

  // Recursive case: if object is an array, loop through each element and recursively call convertDocToObj
  if (Array.isArray(doc)) {
    return doc.map(el => convertDocToObj(el))
  }

  // Recursive case: if object is an object, loop through each property and recursively call convertDocToObj
  if (typeof doc === "object") {
    const newObj = {}
    for (const prop in doc) {
      if (Object.prototype.hasOwnProperty.call(doc, prop)) {
        if (prop === "_id" || prop === "createdAt" || prop === "updatedAt") {
          newObj[prop] = doc[prop].toString()
        } else {
          newObj[prop] = convertDocToObj(doc[prop])
        }
      }
    }
    return newObj
  }

  // Base case: if object is not an object or an array, return it as is
  return doc
}

const db = { connect, disconnect, convertDocToObj }
export default db
