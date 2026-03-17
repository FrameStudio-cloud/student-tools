import BasicCalculator from "../tools/BasicCalculator"
import FinancialCalculator from "../tools/FinancilCalculator"
import ScientificCalculator from "../tools/ScientificCalulator"
import GradeCalculator from "../tools/GradeCalculator"
import DFDGenerator from "../tools/DFDGenerator"


function MainContent({ activeTool }){
    const tools = {
        basic:  <BasicCalculator /> , 
        Scientific: <ScientificCalculator />,
         Financial: <FinancialCalculator />, 
         Grade: <GradeCalculator />, 
         "level-0": <DFDGenerator />, 
         "level-1": <div>Level 1 DFD coming soon</div>,
          Google: <div>Google Research coming soon</div>, 
         Wikipedia: <div>Wikipedia Research coming soon</div>, 
        YouTube: <div>YouTube Research coming soon</div>,
    }
    return(
        <div className=" w-full h-[100] bg-white border-2 border-solid border-black">
            <div className=" w-full flex flex-col ">
                {tools[activeTool]}
            </div>
        </div>
    )
}
export default MainContent