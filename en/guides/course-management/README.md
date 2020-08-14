---
title: Course management
description: "Tutorial: course management"
---

A course is [set up](#setup-learning-trail) as a [learning trail](#learning-trail) with [exercises](/en/for-students#exercise) bundled in **exercise series**. The sequence of series implies a possible order in which the exercises can be [solved](/en/for-students#solution).

A [teacher](/en/user-management#teacher) can [create](#create-course) [courses](#course) without restrictions and will automatically be assigned the role of [course admin](#course-admin) for the created courses. As a course admin, he can [appoint](#appoint-course-admin) other [course users](#course-users) to become course admins aswell to help manage the course. However, he cannot manage courses for which he isn't a course admin.

A [course admin](#course-admin) [lays out](#lay-out-learning-trail) a [learning trail](#learning-trail) for a [course](#course) with [exercise series](#exercise-series). Each series can be [given](#exercise-series-deadline) a [deadline](#deadline) that denotes up to which moment [submitted](/en/for-students#submit-solution) [solutions](/en/for-students#solution) are considered when grading the exercises. [Course users](#course-users) can however keep submitting solutions to exercises after the deadline and receive automated feedback.

# Create course

As a [teacher](/en/user-management#teacher) you can create a new [course](#course) by clicking the button <span class="guilabel">CREATE COURSE</span> in the upper right corner of the [course overview](#course-overview).

![create course](./create-course.png)

There are two options to choose from when creating a new course. Either you start from a pre-existing course, or you create an entirely new one.

![new course menu](./new-course-menu.png)

Press <span class="guilabel">Dodona</span> in the [navigation bar](/en/for-students#navigation-bar) to cancel the creation of the [course](#course).

If you start from an existing course, you must first select it in the table. Use the search bar to filter the displayed courses and find the course of your liking. Click the radio button in the left column to proceed.

![choose existing course](./choose-existing-course.png)

Now you must choose which elements from the existing [course](#course) you wish to copy. The series structure is always copied. You can then choose whether you also want to copy the exercises, deadlines and course admins from the original course. Finally, some other options are possible.

<span class="guilabel">Make the copied series hidden</span>: this is very useful when you want to make a series visible every week without having to manually make them invisible first.


## Setting course properties

With either choice of course creation, you must choose some course specific properties. When copying, these are pre-filled in with the original values. The following properties can be set.

![image](./course-properties.png)


<span class="guilabel">Name</span>


> A name for the [course](#course).
> Different courses can have the same name. However, it is advised to make names as unique as possible.

<span class="guilabel">Teachers</span>

> The names of the [teachers](/en/user-management#teacher) of the [course](#course). If there are multiple teachers, use commas to separate their names.

<span class="guilabel">Academic year</span>

> The academic year in which this [course](#course) is offered. Use the format `yyyy-yyyy` to ensure that the course is sorted correctly on the [starting page](/en/for-students#startingpage) and in the [course overview](#course-overview).

<span class="guilabel">Visibility</span>

> The visibility determines whether [unregistered](/en/for-students#course-register) users can see the course. This property has the following possible values:

>
> 
> <span class="guilabel">Visible</span>
>
>
> > All users see the [course](#course) in the [course overview](#course-overview). They can also navigate to the [course page](/en/for-students#course-page) and [register](/en/for-students#course-register) if they want to.
>
> <span class="guilabel">Hidden</span>
>
> > Only [course admins](#course-admins) see the [course](#course) in the [course overview](#course-overview) and on their [starting page](/en/for-students#starting-page). An icon is displayed to point out the fact that other users cannot see this course there. This icon can also be found on the [course page](/en/for-students#course-page) itself. Only [registered](/en/for-students#course-register) users can navigate to that page. Other users can only register if they use the [registration link](#registration-link).
> >
> > ![image](./hidden-course.png)

<span class="guilabel">Registration procedure</span>

> The registration procedure deterimines whether and how users can [register](/en/for-students#course-register] for the [course](#course). This property can have the following values:
>
> <span class="guilabel">Open</span>
>
> > Any user can [register](/en/for-students#course-register) for this [course](#course) without explicit approval of a [course admin](#course-admin).
>
> <span class="guilabel">Moderated</span>
>
> > Users can [submit](/en/for-students#submit-registration-request) a [registration request](/en/for-students#registration-request) for the [course](#course) but are only [registered](/en/for-students#course-register) when a [course admin](#course-admin) [approves](#approve-registration-request) their registration request.
>
> <span class="guilabel">Closed</span>
>
> > Users can no longer [register](/en/for-students#course-register) for this [course](#course).
>
> ::: tip Important
>
> When you change the registration procedure, existing [registrations](/en/for-students#course-registeren) and [registration-requests](/en/for-students#registration-request) for the [course](#course) remain valid. You will have to manually edit the [registration status](#registration-status) of [course users](#course-users).
> :::