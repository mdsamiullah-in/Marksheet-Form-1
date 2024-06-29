window.jsPDF = window.jspdf.jsPDF;
var doc = jsPDF();


//Adding subject Field
var addSubjects = document.getElementById("add-subjects");
addSubjects.onclick = function(){
    var div = document.createElement("div");
    div.id = "horizontal"



    //subject
    var subject = document.createElement("input");
    subject.name = "subject";
    subject.placeholder = "Subject Name";
    subject.type = "text";
    subject.className = "subjects";



    //fullmarks
    var fullmarks = document.createElement("input")
    fullmarks.name = "fullmarks";
    fullmarks.placeholder = "Full Marks";
    fullmarks.type = "number";                                 
    fullmarks.className = "fullmarks"



    //Obtain Marks
    var obtainedMarks = document.createElement("input");
    obtainedMarks.name = "obtainedMarks";
    obtainedMarks.placeholder = "Obtained Marks";
    obtainedMarks.type = "number";
    obtainedMarks.className = "obtained-marks";
    


     //Delete Button
       var deleteButton = document.createElement("button");
       deleteButton.innerHTML = "<i class='fa fa-trash'></i>";
       deleteButton.className = "delete-b";
       deleteButton.type = "button";
       deleteButton.className = "delete-button";

   
         //Adding input inside div tag
         div.append(subject);
         div.append(fullmarks);
         div.append(obtainedMarks);
         div.append(deleteButton);
     
          deleteButton.onclick = function(){
          div.remove();
          subjectTr.remove();
     
     
         }

    //Adding div tag to form
    var dynamicArea = document.getElementById("dynamic-area");
    dynamicArea.append(div);
   
    

 //Creating subject tr
 var subjectTr = document.createElement("tr");
 subjectTr.style.textAlign = "center";

 var subjectTd = document.createElement("td");
 subjectTd.setAttribute("colspan", "3");

 var fullmarksTd = document.createElement("td");
 var obtainedTd = document.createElement("td");
 obtainedTd.setAttribute("colspan", "3");

 subjectTr.append(subjectTd);
 subjectTr.append(fullmarksTd);
 subjectTr.append(obtainedTd);

 var subjectBody = document.getElementById("subject-body");
 subjectBody.append(subjectTr);



   //Live preview subject and marks entry
   subject.oninput = function(){
    subjectTd.innerHTML = this.value;
   }

  fullmarks.oninput = function(){
    fullmarksTd.innerHTML = this.value;
  }




  obtainedMarks.oninput = function(){
    obtainedTd.innerHTML = this.value;

       //Calculate total marks
   var totalMarks = 0;
   var obm = document.getElementsByClassName("obtained-marks");
   for(var i=0; i<obm.length; i++)
   {
    var num = Number(obm[i].value);
    totalMarks = totalMarks+num;
   }
   var totalMarksTd = document.getElementById("total-marks");
   totalMarksTd.innerHTML = totalMarks;



 
   //Calculate percentage
   var noOfSubjects = obm.length;
   var percentage = parseInt(totalMarks/noOfSubjects);
   var percentageTd = document.getElementById("percentage");
   percentageTd.innerHTML = percentage+'%';



   //Finding grade
     var grade = '';
     if(percentage > 90) grade = 'A+';

     else if(percentage >80) grade = 'A';

     else if(percentage > 70) grade = 'B+';

     else if(percentage > 60) grade = 'B';

     else grade = 'E';

     var gradeTd = document.getElementById("grade");
     gradeTd.innerHTML = grade;
}
}



//Upload and Preview student image
var studentPicInput = document.getElementById("student-pic-input");
studentPicInput.onchange = function(){
    var file = this.files[0];
    var url = URL.createObjectURL(file);
    var studentPic = document.getElementById("student-pic");
    studentPic.src = url;
}


//Upload and Preview school logo
  var schoolLogoInput = document.getElementById("school-logo-input");
  schoolLogoInput.onchange = function(){
    var file = this.files[0];
    var url = URL.createObjectURL(file);
    var schoolLogo = document.getElementById("school-logo");
    schoolLogo.src = url;
  }


// Live preview of School Name

var SchoolNameInput = document.getElementById("school-name-input-value");
SchoolNameInput.oninput = function(){
    var schoolName = document.getElementById("school-name");
    schoolName.innerHTML = this.value;
}


//Live preview of Tag Name

var TagNameInput = document.getElementById("tagname-input-value");
TagNameInput.oninput = function(){
    var tagname = document.getElementById("tagname");
    tagname.innerHTML = this.value;
}


//Live preview of Candidate Name
var candidateName = document.getElementById("candidate-name");
candidateName.oninput = function(){
    var CandidateInputName = document.getElementById("CandidateInputName");
    CandidateInputName.innerHTML = this.value;
}


//Live preview of Father name
var fatherName = document.getElementById("father-name");
  fatherName.oninput = function(){
    var fatherInputName = document.getElementById("fatherInputName");
    fatherInputName.innerHTML = this.value;
  }



     var DateofMonth = document.getElementById("DateOfMonth");
     DateOfMonth.oninput = function(){
    var DateInputValue = document.getElementById("DateInputValue");
    DateInputValue.innerHTML = this.value;
   }


   var className = document.getElementById("className");
   className.oninput = function(){
    var classInput = document.getElementById("classInput");
    classInput.innerHTML = this.value;
   }


   var rollName = document.getElementById("rollName");
   rollName.oninput = function(){
    var rollInput = document.getElementById("rollInput");
    rollInput.innerHTML = this.value;
   }


var selectGender = document.getElementById("selectGender");
selectGender.onchange = function(){
    var chooseGender = document.getElementById("choose-gender");
    chooseGender.innerHTML = this.value;
}


var findTextWidth = function(text, fontSize){
     var textWidth = doc.getTextDimensions(text, {
        fontSize: fontSize
     }).w;
     return textWidth;
}


//Export to pdf
var form = document.getElementById("marksheet-form");
form.onsubmit = function(e){
   e.preventDefault();
   var elements = form.elements; 
   var schoolLogo = elements.schoolLogo.files[0];
   var schoolLogoUrl = URL.createObjectURL(schoolLogo);
   var schoolName = elements.schoolName.value;
   var tagline = elements.tagline.value;
   var candidateName = elements.candidateName.value;
   var fatherName = elements.fatherName.value;
   var dob = elements.DateOfMonth.value;
   var gender = elements.selectGender.value;
   var Class = elements.class.value;
   var roll = elements.roll.value;


   //Getting subjects Values
var subjects = document.getElementsByClassName("subjects");
var fullmarks = document.getElementsByClassName("fullmarks");
var obtainedMarks = document.getElementsByClassName("obtained-marks");

var subjectsBody = []

for(var i=0; i<subjects.length; i++){
  var subject = subjects[i].value;
  var fullmark = fullmarks[i].value;
  var obtainedMark = obtainedMarks[i].value;
  subjectsBody.push([subject, fullmark, obtainedMark]);

}


   //Generate pdf
   var schoolLogoWidth = 50;
   var pageWidth = doc.internal.pageSize.width;
   var schoolLogoLeftMargin = (pageWidth-schoolLogoWidth)/2
   doc.addImage(schoolLogoUrl, 'PNG', schoolLogoLeftMargin, 5, schoolLogoWidth, 30);


   //Setting school name
   var schoolNameFontSize = 20;
   var schoolNameWidth = findTextWidth(schoolName, schoolNameFontSize);
   var schoolNameLeftMargin = (pageWidth-schoolNameWidth)/2
   doc.setFontSize(schoolNameFontSize);
   doc.text(schoolName, schoolNameLeftMargin, 37);

   //Setting tagline
   var taglineFontSize = 10;
   var taglineWidth = findTextWidth(tagline, taglineFontSize);
   var taglineLeftMargin = (pageWidth-taglineWidth)/2
   doc.setFontSize(taglineFontSize);
   doc.text(tagline, taglineLeftMargin, 43);


   //Setting Table
   doc.autoTable({
    margin: {top: 50},
      body: [
        [
            {content: 'Student`s Name', styles: {fontStyle: 'bold', fillColor: '#2E80BA', textColor: 'white'}},
            candidateName,
            {content: 'Father`s Name', styles: {fontStyle: 'bold', fillColor: '#2E80BA', textColor: 'white'}},
            fatherName
        ],

        [ 
          {content: 'DOB', styles: {fontStyle: 'bold', fillColor: '#ddd', textColor: 'black'}},
         dob,
         {content: 'Gender', styles: {fontStyle: 'bold', fillColor: '#ddd', textColor: 'black'}},
          gender
        ],

        [
            {content: 'Class', styles: {fontStyle: 'bold', fillColor: '#2E80BA', textColor: 'white'}},
             Class,
             {content: 'Roll', styles: {fontStyle: 'bold', fillColor: '#2E80BA', textColor: 'white'}},
               roll
            ]
      ]
   });


   //Setting subject Table
doc.autoTable({
  headStyles: {fillColor: '#2E80BA', textColor: 'white',},
  head: [['Subjects', 'Fullmarks', 'Obtained Marks']],
  body: subjectsBody
});

  
     //Marks Table
     var total = 0;
    for(var i=0; i<obtainedMarks.length; i++){
      total =  total+Number(obtainedMarks[i].value)
      obtainedMarks[i].value
    }


    var percent = Math.floor(total/obtainedMarks.length);

    var grade = "";
    if(percent > 90) grade = 'A+';
    else if(percent >80) grade = 'A';
    else if(percent > 70) grade = 'B+';
    else if(percent > 60) grade = 'B';
    else grade = 'E';


    doc.autoTable({
      head: [['Grade', 'Percentage', 'Total Marks']],
      body: [[grade, percent+'%', total]]
    })

    

   //Download
   doc.save("marksheet.pdf")


}