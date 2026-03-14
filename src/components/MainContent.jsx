import BasicCalculator from "../tools/BasicCalculator"
import FinancialCalculator from "../tools/FinancilCalculator"
import ScientificCalculator from "../tools/ScientificCalulator"


function MainContent({ activetab, activeTool }){
    const tools = {
        basic:  <BasicCalculator /> , 
        Scientific: <ScientificCalculator />,
         Financial: <FinancialCalculator />, 
         Grade: <div>Grade Calculator coming soon</div>, 
         "level-0": <div>Level 0 DFD coming soon</div>, 
         "level-1": <div>Level 1 DFD coming soon</div>,
          Google: <div>Google Research coming soon</div>, 
         Wikipedia: <div>Wikipedia Research coming soon</div>, 
        YouTube: <div>YouTube Research coming soon</div>,
    }
    return(
        <div className="flex w-full h-full">
            {tools[activeTool]}
        </div>
    )
}
export default MainContent