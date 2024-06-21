// import React, { useState, useEffect } from 'react';

// const SurveyForm = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     surveyTopic: '',
//     techLanguage: '',
//     techExperience: '',
//     healthFrequency: '',
//     healthDiet: '',
//     educationQualification: '',
//     educationField: '',
//     feedback: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [additionalQuestions, setAdditionalQuestions] = useState([]);
//   const [submittedData, setSubmittedData] = useState(null);

//   const questionsData = {
//     Technology: [
//       { id: 1, question: "What is your favorite tech stack?" },
//       { id: 2, question: "Which development tool do you prefer?" }
//     ],
//     Health: [
//       { id: 3, question: "What is your favorite exercise?" },
//       { id: 4, question: "How do you manage stress?" }
//     ],
//     Education: [
//       { id: 5, question: "What was your favorite subject in school?" },
//       { id: 6, question: "Who was your favorite teacher?" }
//     ]
//   };

//   useEffect(() => {
//     if (formData.surveyTopic) {
//       setAdditionalQuestions(questionsData[formData.surveyTopic]);
//     }
//   }, [formData.surveyTopic]);

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.fullName) newErrors.fullName = 'Full Name is required';
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }
//     if (!formData.surveyTopic) newErrors.surveyTopic = 'Survey Topic is required';
//     if (formData.surveyTopic === 'Technology') {
//       if (!formData.techLanguage) newErrors.techLanguage = 'Favorite Programming Language is required';
//       if (!formData.techExperience) newErrors.techExperience = 'Years of Experience is required';
//     }
//     if (formData.surveyTopic === 'Health') {
//       if (!formData.healthFrequency) newErrors.healthFrequency = 'Exercise Frequency is required';
//       if (!formData.healthDiet) newErrors.healthDiet = 'Diet Preference is required';
//     }
//     if (formData.surveyTopic === 'Education') {
//       if (!formData.educationQualification) newErrors.educationQualification = 'Highest Qualification is required';
//       if (!formData.educationField) newErrors.educationField = 'Field of Study is required';
//     }
//     if (!formData.feedback) newErrors.feedback = 'Feedback is required';
//     else if (formData.feedback.length < 50) newErrors.feedback = 'Feedback must be at least 50 characters';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const fetchAdditionalQuestions = async (topic) => {
//     try {
//       const response = await fetch(`https://api.example.com/questions?topic=${topic}`);
//       const data = await response.json();
//       setAdditionalQuestions(prevQuestions => [...prevQuestions, ...data.questions]);
//     } catch (error) {
//       console.error('Error fetching additional questions:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       await fetchAdditionalQuestions(formData.surveyTopic);
//       setSubmittedData(formData);
//     }
//   };

//   return (
//     <div className="survey-form-container">
//       <h1>Survey Form</h1>
//       <form className="survey-form">
//         <div className="form-group">
//           <label>Full Name:</label>
//           <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
//           {errors.fullName && <p className="error">{errors.fullName}</p>}
//         </div>

//         <div className="form-group">
//           <label>Email:</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} />
//           {errors.email && <p className="error">{errors.email}</p>}
//         </div>

//         <div className="form-group">
//           <label>Survey Topic:</label>
//           <select name="surveyTopic" value={formData.surveyTopic} onChange={handleChange}>
//             <option value="">Select a topic</option>
//             <option value="Technology">Technology</option>
//             <option value="Health">Health</option>
//             <option value="Education">Education</option>
//           </select>
//           {errors.surveyTopic && <p className="error">{errors.surveyTopic}</p>}
//         </div>

//         {formData.surveyTopic === 'Technology' && (
//           <div className="form-group">
//             <label>Favorite Programming Language:</label>
//             <select name="techLanguage" value={formData.techLanguage} onChange={handleChange}>
//               <option value="">Select a language</option>
//               <option value="JavaScript">JavaScript</option>
//               <option value="Python">Python</option>
//               <option value="Java">Java</option>
//               <option value="C#">C#</option>
//             </select>
//             {errors.techLanguage && <p className="error">{errors.techLanguage}</p>}

//             <label>Years of Experience:</label>
//             <input type="number" name="techExperience" value={formData.techExperience} onChange={handleChange} />
//             {errors.techExperience && <p className="error">{errors.techExperience}</p>}
//           </div>
//         )}

//         {formData.surveyTopic === 'Health' && (
//           <div className="form-group">
//             <label>Exercise Frequency:</label>
//             <select name="healthFrequency" value={formData.healthFrequency} onChange={handleChange}>
//               <option value="">Select frequency</option>
//               <option value="Daily">Daily</option>
//               <option value="Weekly">Weekly</option>
//               <option value="Monthly">Monthly</option>
//               <option value="Rarely">Rarely</option>
//             </select>
//             {errors.healthFrequency && <p className="error">{errors.healthFrequency}</p>}

//             <label>Diet Preference:</label>
//             <select name="healthDiet" value={formData.healthDiet} onChange={handleChange}>
//               <option value="">Select diet</option>
//               <option value="Vegetarian">Vegetarian</option>
//               <option value="Vegan">Vegan</option>
//               <option value="Non-Vegetarian">Non-Vegetarian</option>
//             </select>
//             {errors.healthDiet && <p className="error">{errors.healthDiet}</p>}
//           </div>
//         )}

//         {formData.surveyTopic === 'Education' && (
//           <div className="form-group">
//             <label>Highest Qualification:</label>
//             <select name="educationQualification" value={formData.educationQualification} onChange={handleChange}>
//               <option value="">Select qualification</option>
//               <option value="High School">High School</option>
//               <option value="Bachelor's">Bachelor's</option>
//               <option value="Master's">Master's</option>
//               <option value="PhD">PhD</option>
//             </select>
//             {errors.educationQualification && <p className="error">{errors.educationQualification}</p>}

//             <label>Field of Study:</label>
//             <input type="text" name="educationField" value={formData.educationField} onChange={handleChange} />
//             {errors.educationField && <p className="error">{errors.educationField}</p>}
//           </div>
//         )}

//         <div className="form-group">
//           <label>Feedback:</label>
//           <textarea name="feedback" value={formData.feedback} onChange={handleChange} />
//           {errors.feedback && <p className="error">{errors.feedback}</p>}
//         </div>

//         <button type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
//       </form>

//       {submittedData && (
//         <div className="submitted-data">
//           <h2>Submitted Data</h2>
//           <p><strong>Full Name:</strong> {submittedData.fullName}</p>
//           <p><strong>Email:</strong> {submittedData.email}</p>
//           <p><strong>Survey Topic:</strong> {submittedData.surveyTopic}</p>
//           {submittedData.surveyTopic === 'Technology' && (
//             <>
//               <p><strong>Favorite Programming Language:</strong> {submittedData.techLanguage}</p>
//               <p><strong>Years of Experience:</strong> {submittedData.techExperience}</p>
//             </>
//           )}
//           {submittedData.surveyTopic === 'Health' && (
//             <>
//               <p><strong>Exercise Frequency:</strong> {submittedData.healthFrequency}</p>
//               <p><strong>Diet Preference:</strong> {submittedData.healthDiet}</p>
//             </>
//           )}
//           {submittedData.surveyTopic === 'Education' && (
//             <>
//               <p><strong>Highest Qualification:</strong> {submittedData.educationQualification}</p>
//               <p><strong>Field of Study:</strong> {submittedData.educationField}</p>
//             </>
//           )}
//           <p><strong>Feedback:</strong> {submittedData.feedback}</p>
//         </div>
//       )}

//       {additionalQuestions.length > 0 && (
//         <div className="additional-questions">
//           <h3>Additional Questions</h3>
//           {additionalQuestions.map(question => (
//             <div className="form-group" key={question.id}>
//               <label>{question.question}</label>
//               <input type="text" name={`additionalQuestion_${question.id}`} />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SurveyForm;

import React, { useState, useEffect } from 'react';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    techLanguage: '',
    techExperience: '',
    healthFrequency: '',
    healthDiet: '',
    educationQualification: '',
    educationField: '',
    feedback: ''
  });
  const [errors, setErrors] = useState({});
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const questionsData = {
    Technology: [
      { id: 1, question: "What is your favorite tech stack?" },
      { id: 2, question: "Which development tool do you prefer?" }
    ],
    Health: [
      { id: 3, question: "What is your favorite exercise?" },
      { id: 4, question: "How do you manage stress?" }
    ],
    Education: [
      { id: 5, question: "What was your favorite subject in school?" },
      { id: 6, question: "Who was your favorite teacher?" }
    ]
  };

  useEffect(() => {
    if (formData.surveyTopic) {
      setAdditionalQuestions(questionsData[formData.surveyTopic]);
    }
  }, [formData.surveyTopic]);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.surveyTopic) newErrors.surveyTopic = 'Survey Topic is required';
    if (formData.surveyTopic === 'Technology') {
      if (!formData.techLanguage) newErrors.techLanguage = 'Favorite Programming Language is required';
      if (!formData.techExperience) newErrors.techExperience = 'Years of Experience is required';
    }
    if (formData.surveyTopic === 'Health') {
      if (!formData.healthFrequency) newErrors.healthFrequency = 'Exercise Frequency is required';
      if (!formData.healthDiet) newErrors.healthDiet = 'Diet Preference is required';
    }
    if (formData.surveyTopic === 'Education') {
      if (!formData.educationQualification) newErrors.educationQualification = 'Highest Qualification is required';
      if (!formData.educationField) newErrors.educationField = 'Field of Study is required';
    }
    if (!formData.feedback) newErrors.feedback = 'Feedback is required';
    else if (formData.feedback.length < 50) newErrors.feedback = 'Feedback must be at least 50 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchAdditionalQuestions = async (topic) => {
    try {
      const response = await fetch(`https://api.example.com/questions?topic=${topic}`);
      const data = await response.json();
      setAdditionalQuestions(prevQuestions => [...prevQuestions, ...data.questions]);
    } catch (error) {
      console.error('Error fetching additional questions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      await fetchAdditionalQuestions(formData.surveyTopic);
      setSubmittedData(formData);
      setLoading(false);
    }
  };

  return (
    <div className="survey-form-container">
      <h1>Survey Form</h1>
      <form className="survey-form">
        <div className="form-group">
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Survey Topic:</label>
          <select name="surveyTopic" value={formData.surveyTopic} onChange={handleChange}>
            <option value="">Select a topic</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
          {errors.surveyTopic && <p className="error">{errors.surveyTopic}</p>}
        </div>

        {formData.surveyTopic === 'Technology' && (
          <div className="form-group">
            <label>Favorite Programming Language:</label>
            <select name="techLanguage" value={formData.techLanguage} onChange={handleChange}>
              <option value="">Select a language</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
            </select>
            {errors.techLanguage && <p className="error">{errors.techLanguage}</p>}

            <label>Years of Experience:</label>
            <input type="number" name="techExperience" value={formData.techExperience} onChange={handleChange} />
            {errors.techExperience && <p className="error">{errors.techExperience}</p>}
          </div>
        )}

        {formData.surveyTopic === 'Health' && (
          <div className="form-group">
            <label>Exercise Frequency:</label>
            <select name="healthFrequency" value={formData.healthFrequency} onChange={handleChange}>
              <option value="">Select frequency</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Rarely">Rarely</option>
            </select>
            {errors.healthFrequency && <p className="error">{errors.healthFrequency}</p>}

            <label>Diet Preference:</label>
            <select name="healthDiet" value={formData.healthDiet} onChange={handleChange}>
              <option value="">Select diet</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
            {errors.healthDiet && <p className="error">{errors.healthDiet}</p>}
          </div>
        )}

        {formData.surveyTopic === 'Education' && (
          <div className="form-group">
            <label>Highest Qualification:</label>
            <select name="educationQualification" value={formData.educationQualification} onChange={handleChange}>
              <option value="">Select qualification</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
            {errors.educationQualification && <p className="error">{errors.educationQualification}</p>}

            <label>Field of Study:</label>
            <input type="text" name="educationField" value={formData.educationField} onChange={handleChange} />
            {errors.educationField && <p className="error">{errors.educationField}</p>}
          </div>
        )}

        <div className="form-group">
          <label>Feedback:</label>
          <textarea name="feedback" value={formData.feedback} onChange={handleChange} />
          {errors.feedback && <p className="error">{errors.feedback}</p>}
        </div>

        <button type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
      </form>

      {loading && (
        <div className="loading">
          <p>Loading...</p>
          {/* You can replace the above line with an actual spinner or loading animation */}
        </div>
      )}

      {submittedData && !loading && (
        <div className="submitted-data">
          <h2>Submitted Data</h2>
          <p><strong>Full Name:</strong> {submittedData.fullName}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Survey Topic:</strong> {submittedData.surveyTopic}</p>
          {submittedData.surveyTopic === 'Technology' && (
            <>
              <p><strong>Favorite Programming Language:</strong> {submittedData.techLanguage}</p>
              <p><strong>Years of Experience:</strong> {submittedData.techExperience}</p>
            </>
          )}
          {submittedData.surveyTopic === 'Health' && (
            <>
              <p><strong>Exercise Frequency:</strong> {submittedData.healthFrequency}</p>
              <p><strong>Diet Preference:</strong> {submittedData.healthDiet}</p>
            </>
          )}
          {submittedData.surveyTopic === 'Education' && (
            <>
              <p><strong>Highest Qualification:</strong> {submittedData.educationQualification}</p>
              <p><strong>Field of Study:</strong> {submittedData.educationField}</p>
            </>
          )}
          <p><strong>Feedback:</strong> {submittedData.feedback}</p>
        </div>
      )}

      {additionalQuestions.length > 0 && (
        <div className="additional-questions">
          <h3>Additional Questions</h3>
          {additionalQuestions.map(question => (
            <div className="form-group" key={question.id}>
              <label>{question.question}</label>
              <input type="text" name={`additionalQuestion_${question.id}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
