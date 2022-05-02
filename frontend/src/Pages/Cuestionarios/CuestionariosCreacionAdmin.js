import 'survey-core/modern.min.css';
// Default theme
// import 'survey-core/survey.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'survey-core/modern.min.css';
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import { StylesManager } from 'survey-core';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'survey-core/modern.min.css';
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
StylesManager.applyTheme("modern");




const surveyJson = {
    elements: [{
        name: "FirstName",
        title: "Enter your first name:",
        type: "text"
    }, {
        name: "LastName",
        title: "Enter your last name:",
        type: "text"
    }]
    };

function CuestionariosCreacionAdmin() {
   
        
   

            }
export default CuestionariosCreacionAdmin;