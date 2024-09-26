// eslint-disable-next-line no-unused-vars
import React from 'react'

const OurFleet = () => {
    // Example team member data (replace with actual data)
    const team = [
        {
            name: 'John Doe',
            position: 'Driver Incharge',
            bio: 'Experienced driver with over 10 years of touring experience.',
            image: '/images/john-doe.jpg' // Replace with actual image paths
        },
        {
            name: 'Jane Smith',
            position: 'Tour Coordinator',
            bio: 'Specializes in organizing personalized and group tours.',
            image: '/images/jane-smith.jpg'
        },
        {
            name: 'Mike Johnson',
            position: 'Mechanic',
            bio: 'Ensures all vehicles are in top condition for every journey.',
            image: '/images/mike-johnson.jpg'
        },
        {
            name: 'Sarah Williams',
            position: 'Customer Service Representative',
            bio: 'Your go-to person for any booking queries and support.',
            image: '/images/sarah-williams.jpg'
        }
    ]

    return (
        <div className="o_f_team-container">
            <h1>Meet Our Team</h1>
            <div className="o_f_team-grid">
                {team.map((member, index) => (
                    <div
                        key={index}
                        className="o_f_team-member">
                        <img
                            src={member.image}
                            alt={member.name}
                        />
                        <div className="o_f_member-info">
                            <h2>{member.name}</h2>
                            <p className="o_f_position">{member.position}</p>
                            <p className="o_f_bio">{member.bio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OurFleet
