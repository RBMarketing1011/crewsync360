'use client'

import { useContext, useEffect } from 'react'

import Loading from '@components/atom/Loading'

import VerifyEmail from '@components/organism/backend/newUserSections/VerifyEmail'
import { verifyToken } from '@lib/helpers/verifyToken'

import VerifyCompanyDetails from '@components/organism/backend/newUserSections/VerifyCompanyDetails'
import VerifyUserDetails from '@components/organism/backend/newUserSections/VerifyUserDetails'
import AddUserPreferences from '@components/organism/backend/newUserSections/AddUserPreferences'
import InviteAdditionalUsers from '@components/organism/backend/newUserSections/InviteAdditionalUsers'
import NewUserCompleted from '@components/organism/backend/newUserSections/NewUserCompleted'

import { NewUserScreenContext } from '@providers/context/NewUserScreenProvider'
import { UserContext } from '@providers/context/UserProvider'
import NewUserCard from '@components/organism/backend/newUserSections/NewUserCard'

import { toast } from 'react-toastify'

const NewUserPage = () =>
{
  const {
    progressState, currentState, loadingState, companyInfoState,
    userInfoState, userPreferencesState, emailErrorState
  } = useContext(NewUserScreenContext)

  const [ progress, setProgress ] = progressState
  const [ current, setCurrent ] = currentState
  const [ loading, setLoading ] = loadingState
  const [ companyInfo, setCompanyInfo ] = companyInfoState
  const [ userInfo, setUserInfo ] = userInfoState
  const [ userPreferences, setUserPreferences ] = userPreferencesState
  const [ emailError, setEmailError ] = emailErrorState

  const { sessionState } = useContext(UserContext)
  const [ session, update ] = sessionState

  useEffect(() =>
  {
    const handleActions = async () =>
    {
      const emailVerified = session?.user?.isEmailVerified
      const owner = session?.user?.role === 'owner'

      const p1 = emailVerified && owner
      const p2 = emailVerified && !owner
      const p3 = !emailVerified && owner
      const p4 = !emailVerified && !owner

      if (p1)
      {
        setProgress([
          {
            name: 'Verify Company',
            status: 'current',
            required: true,
            complete: false
          },
          {
            name: 'Verify User',
            status: 'upcoming',
            required: false,
            complete: false
          },
          {
            name: 'Add User Preference',
            status: 'upcoming',
            required: false,
            complete: false
          },
          {
            name: 'Add Users',
            status: 'upcoming',
            required: false,
            complete: false
          },
          {
            name: 'New User Completed',
            status: 'upcoming',
            required: true,
            complete: false
          }
        ])

        progress && setCurrent(progress[ 0 ])

      } else if (p2)
      {
        setProgress([
          {
            name: 'Verify User',
            status: 'current',
            required: false,
            complete: false
          },
          {
            name: 'Add User Preference',
            status: 'upcoming',
            required: false,
            complete: false
          },
          {
            name: 'New User Completed',
            status: 'upcoming',
            required: true,
            complete: false
          }
        ])

        progress && setCurrent(progress[ 0 ])

      } else if (p3)
      {
        setProgress([
          {
            name: 'Verify Email',
            status: 'current',
            required: true,
            complete: false
          },
          {
            name: 'Verify Company',
            status: 'upcoming',
            required: true,
            complete: false
          },
          {
            name: 'Verify User',
            status: 'upcoming',
            required: false,
            complete: false
          },
          {
            name: 'Add User Preference',
            status: 'upcoming',
            required: false, complete: false
          },
          {
            name: 'Add Users',
            status: 'upcoming',
            required: false,
            complete: false
          },
          {
            name: 'New User Completed',
            status: 'upcoming',
            required: true,
            complete: false
          }
        ])

        progress && setCurrent(progress[ 0 ])

        await verifyToken(session.user.email)

      } else if (p4)
      {
        setProgress([
          {
            name: 'Verify Email',
            status: 'current',
            required: true,
            complete: false
          },
          {
            name: 'Verify User',
            status: 'upcoming',
            required: false,
            complete: false
          },
          {
            name: 'Add User Preference',
            status: 'upcoming',
            required: false,
            complete: false
          },
          {
            name: 'New User Completed',
            status: 'upcoming',
            required: true,
            complete: false
          }
        ])

        progress && setCurrent(progress[ 0 ])

        await verifyToken(session?.user?.email)

      }

      setLoading(false)
    }

    session && handleActions()

  }, [ session ])

  // DEBUG CURRENT 
  useEffect(() =>
  {
    if (progress)
    {
      progress.map((step, idx) =>
      {
        if (step.status === 'current')
        {
          setCurrent(step)
        }
      })
    }
  }, [ progress ])

  const updateProgress = (currentIdx) =>
  {
    setProgress(prev =>
      prev.map((step, idx) =>
      {
        if (idx === currentIdx)
        {
          // Mark current step as complete
          return {
            ...step,
            status: 'complete',
            complete: true
          }
        } else if (idx === currentIdx + 1)
        {
          // Mark next step as current (handles normal transition)
          return {
            ...step,
            status: 'current'
          }
        }

        return step
      })
    )
  }

  const moveToNextStep = () =>
  {
    progress.forEach((step, idx) =>
    {
      if (step.status === 'current')
      {
        // Move to the next step in the sequence
        updateProgress(idx)
      }
    })
  }


  const submitVerifyEmail = async (e) =>
  {
    e.preventDefault()

    moveToNextStep()

    setEmailError({
      type: 'done',
      message: '',
      showError: false
    })
  }

  // For Company Details Page 
  const submitCompanyDetails = async (e) =>
  {
    e.preventDefault()

    try
    {
      const req = await fetch(`/api/v1/account/${ session.account._id }`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(companyInfo)
      })

      const res = await req.json()

      if (res.success)
      {
        moveToNextStep()

      } else if (res.error)
      {
        toast.error(res.error)
      }

    } catch (error)
    {
      toast.error(error.message)
    }
  }

  // For User Details Page
  const submitUserDetails = async (e) =>
  {
    e.preventDefault()

    try
    {
      const req = await fetch(`/api/v1/account/${ session?.account?._id }/users/${ session?.user?._id }`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      })

      const res = await req.json()

      if (res.success)
      {
        moveToNextStep()

      } else if (res.error)
      {
        toast.error(res.error)
      }

    } catch (error)
    {
      toast.error(error.message)
    }
  }

  const submitUserPreferences = async (e) =>
  {
    e.preventDefault()

    try
    {
      const req = await fetch(`/api/v1/account/${ session?.account?._id }/users/${ session?.user?._id }`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userPreferences)
      })

      const res = await req.json()

      if (res.success)
      {
        moveToNextStep()

      } else if (res.error)
      {
        toast.error(res.error)
      }

    } catch (error)
    {
      toast.error(error.message)
    }
  }

  const submitAdditionalUsers = async (e) =>
  {
    e.preventDefault()

    moveToNextStep()

  }

  return (
    <main className='w-screen h-screen flex justify-center items-start md:items-center'>

      {
        loading ?
          <div className='w-full h-full flex flex-col justify-center items-center animate-scale-up'>
            <p className='text-sm font-extrabold bg-gradient-to-r from-cyan-500 to-cyan-800 bg-clip-text text-transparent'>
              Welcome to
            </p>
            <div className='flex items-center gap-4'>
              <p className='text-2xl font-extrabold bg-gradient-to-r from-cyan-500 to-cyan-800 bg-clip-text text-transparent'>Juggernaut 360</p>
            </div>
            <p className='text-xl font-semibold mt-4 max-w-sm text-center'>
              The soon to be most powerful tool in your arsenal
            </p>
          </div>

          :

          current.name === 'Verify Email' ?

            <NewUserCard
              submit={ (e) => submitVerifyEmail(e) }
            >
              <VerifyEmail />
            </NewUserCard>

            :

            current.name === 'Verify Company' ?

              <NewUserCard
                submit={ (e) => submitCompanyDetails(e) }
              >
                <VerifyCompanyDetails />
              </NewUserCard>

              :

              current.name === 'Verify User' ?

                <NewUserCard
                  submit={ (e) => submitUserDetails(e) }
                >
                  <VerifyUserDetails />
                </NewUserCard>

                :

                current.name === 'Add User Preference' ?

                  <NewUserCard
                    submit={ (e) => submitUserPreferences(e) }
                  >
                    <AddUserPreferences />
                  </NewUserCard>

                  :

                  current.name === 'Add Users' ?

                    <NewUserCard
                      submit={ (e) => submitAdditionalUsers(e) }
                    >
                      <InviteAdditionalUsers />
                    </NewUserCard>

                    :

                    current.name === 'New User Completed' &&

                    <NewUserCard>
                      <NewUserCompleted />
                    </NewUserCard>
      }

    </main>
  )
}

export default NewUserPage