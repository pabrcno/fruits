# Fruits!

## Brief

This is an app to showcase some of my abilities as a react dev, it contains general logic that can be used with any desired 3D assets but I decided to call it fruits because they are fun! Hope you like it, I had a ton of fun making it! Please feel free to check my other public projects, and if you wanna see more complex stuff just let me know and we can review the good private stuff 😎.

## Core Goals

The project focuses on accomplishing the following requests:

1. A visually appealing background effect that responds to mouse movements.
   As the user moves their mouse within the webpage, the background should
   dynamically change or animate in response. You can choose to use CSS
   animations, HTML5 Canvas, or any other suitable technology to achieve the
   effect.
   The background effect should be interactive and visually engaging, providing
   a pleasant experience for the user. For example, the background could
   consist of particles that follow the mouse cursor, change color, or create
   visual trails as the user moves the mouse.
   Here is a link to an example video demonstrating the kind of effects we are
   looking for. This video is just a reference, but it is not required to replicate it
   exactly. Instead, you could aim for something with a similar complexity and
   visual appeal.
   Link:
   https://drive.google.com/file/d/17-m_WiYtYz1GQF5ntpEi4mGMeRcm6qMv/view?usp=sharing

2. Implement animations triggered by scrolling. As the user scrolls down the
   webpage, certain elements on the page should animate or transition into view.
   You can choose to animate text, images, or any other elements you think are
   appropriate for the webpage's content.
3. Ensure smooth animations and transitions throughout the webpage. The
   animations should be visually appealing and contribute to an overall polished
   and professional user experience.
4. Use ReactJS to create modular components and manage the state of the
   webpage as necessary. Organize your code in a structured and maintainable
   manner.

## Extras:

I wanted to show case the fact that as a professional my thinking process always goes towards the viability and monetization of the project, the cleanness of the code and the architecture of the app, my focus was to give a new user experience that uses 3D in order to make the buying process fun, the reusability of the components and the clearness of the structure.

I added the following extras:

1. Basic Ux
2. Store Screen
3. Infinite Background Scroll
4. Full Responsiveness

## Architecture

This is a basic UI app but if you explore the code you can see that the components are intentionally separated from all the business and complex reusable ui logic by the use of action hooks (Refer to useStore.ts, useMeshBackgroundPositioning, useZScrolling).

#### State Management Note

Basic local state management using useState.

#### Navigation Note

Basic navigation is provided by setting local states.

## Tech Stack

I went for a lightweight react app. I decided not to use Next for this specific project as it was an overkill in my opinion, also most of the components are necessarily client side rendered and I think no one likes to over use "use client".

- 3D meta-framework: react-three-fiber(https://github.com/pmndrs/react-three-fiber) + drei(https://github.com/pmndrs/drei)
- Styling: styled-components(https://styled-components.com/)

## Contact

Please feel free to reach out!

- Linkedn(https://www.linkedin.com/in/paulo-briceno/)
