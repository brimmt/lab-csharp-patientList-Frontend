import { useState, useEffect } from "react";



function PatientList() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPatients() {
            try {
                const response = await fetch("http://localhost:5123/api/patients");
                const data = await response.json();
                setPatients(data)
            } catch (error) {
                console.error("Error fetching patients:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPatients();
    }, []);
    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Patient List</h2>

            {patients.length === 0 ? (
                <p>No patients found.</p>
            ) : (
                <ul>
                    {patients.map((patient) => (
                        <li key={patient.id}>{patient.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}


export default PatientList;