// eslint-disable-next-line no-unused-vars
import React from 'react'
import img from '../assets/myimg.png'
const OurFleet = () => {
    // Example team member data (replace with actual data)
    const team = [
        {
            name: 'Pankaj Kholiya',
            position: 'Driver Incharge',
            bio: 'Experienced driver with over 10 years of touring experience.',
            image: { img }
        },
        {
            name: 'Pankaj Kholiya',
            position: 'Tour Coordinator',
            bio: 'Specializes in organizing personalized and group tours.',
            image: { img }
        },
        {
            name: 'Pankaj Kholiya',
            position: 'Mechanic',
            bio: 'Ensures all vehicles are in top condition for every journey.',
            image: { img }
        },
        {
            name: 'Pankaj Kholiya',
            position: 'Customer Service Representative',
            bio: 'Your go-to person for any booking queries and support.',
            image: { img }
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
