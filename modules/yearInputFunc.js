import { addCountyPeriodItems } from "./addCountyPeriodItems.js"
import { genYearIndex } from "./genYearIndex.js"

// yearinput event listner has diff. delays depending on input -
// ex. if user puts in 18 it takes longer to trigger than 1845 as they may be thinking of how to finish teh date
// this function just consolidates the code as the outcomes are the same for each delay
export const yearInputFunctions = () => {
    genYearIndex()
    addCountyPeriodItems()
}