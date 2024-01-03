import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useGetClubDataQuery, useRequestJoinformMutation } from '../../app/EndPoints/HarkatClub';
import CSRFToken from '../CSRF_Token/CSRFToken';

const RequestForm = ({ setRequestForm, requestForm }) => {
    const { id } = useParams();
    const { register, reset, formState: { errors }, handleSubmit } = useForm();
    const user = useSelector((state) => state.user.id);
    const { data: club } = useGetClubDataQuery(id);
    const [requestJoinform, resInfo] = useRequestJoinformMutation();
    const onSubmit = data => {
        const mobile_no = data.mobilenumber;
        const prev_club = data.previousclubname;
        const join_reason = data.joinreason;
        const film_exp = data.filmexperience;
        const skills = data.skills;
        const equipments = data.filmequipments;
        const club_exp = data.clubexperience;
        const club_id = id;
        const member_id = user;
        const member_status = "pending";
        const body = new FormData();
        body.append('mobile_no', mobile_no);
        body.append('prev_club', prev_club);
        body.append('join_reason', join_reason);
        body.append('film_exp', film_exp);
        body.append('skills', skills);
        body.append('equipments', equipments);
        body.append('club_exp', club_exp);
        body.append('club_id', club_id);
        body.append('member_id', member_id);
        body.append('member_status', member_status);
        requestJoinform(body);
        reset();
        if (!resInfo.isSuccess) {
            toast.info("Join request submitting", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
        setRequestForm(false);
    }
    if (resInfo.isSuccess) {
        toast.success("Join request submitted successfully.", {
            position: toast.POSITION.BOTTOM_CENTER
        });
        resInfo.isSuccess = false;
        window.location.reload();
    }
    // console.log(resInfo);
    return (
        <div>
            {requestForm && <div>
                <input type="checkbox" id="request-join" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative keep_scrolling mt-20">
                        <label htmlFor="request-join" className="btn btn-sm btn-circle absolute right-2 top-2 hover:text-white">✕</label>
                        <section className="p-3 bg-slate-100 text-black">
                            <div className="flex flex-row-reverse justify-center items-center">
                                <h1 className="text-5xl font-bold ml-5 leading-none sm:text-4xl xl:max-w-md text-gray-900">{club?.club?.club_id?.club_name}</h1>
                                <img alt="" src={`https://mynextfilm.ai${club?.club?.club_profile}`} className="object-cover w-20 h-20 rounded-full shadow" />
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="container flex flex-col mx-auto ng-untouched ng-pristine ng-valid">
                                <CSRFToken />
                                <div className="grid gap-2 grid-cols-1 col-span-6 py-3">
                                    <div className="lg:col-span-6 sm:col-span-3">
                                        <label for="mobilenumber" className="text-md font-semibold">Mobile Number <span className='text-[#33B0CA]'>*</span></label>
                                        <input type="text" {...register("mobilenumber", {
                                            required: {
                                                value: true,
                                                message: 'Mobile number is Required'
                                            },
                                            pattern: {
                                                value: /^\d{10}$/,
                                                message: 'Please enter Ten-digit valid number'
                                            }
                                        })} placeholder="Mobile Number" className="w-full h-8 rounded-md border-[1px] border-black text-gray-900 p-2" />
                                        <ErrorMessage
                                            errors={errors}
                                            name="mobilenumber"
                                            render={({ message }) => <p className='text-[#33B0CA]'>{message}</p>}
                                        />
                                    </div>
                                    <div className="lg:col-span-6 sm:col-span-3">
                                        <label for="previousclubname" className="text-md font-semibold">Previous Club Name <span className='text-[#33B0CA]'>*</span></label>
                                        <input type="text" {...register("previousclubname", {
                                            required: {
                                                value: true,
                                                message: 'Previous Club Name is Required'
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z ]*$/,
                                                message: 'Only letters acceptable'
                                            }
                                        })} placeholder="Previous Club Name" className="w-full h-8 rounded-md border-[1px] border-black text-gray-900 p-2" />
                                        <ErrorMessage
                                            errors={errors}
                                            name="previousclubname"
                                            render={({ message }) => <p className='text-[#33B0CA]'>{message}</p>}
                                        />
                                    </div>
                                    <div className="col-span-6 lg:col-span-6">
                                        <label for="joinreason" className="text-md font-semibold">Join Reason </label>
                                        <textarea type="text" placeholder="join reason"
                                        //  {...register("joinreason", {
                                        //     required: {
                                        //         value: true,
                                        //         message: 'Join Reason is Required'
                                        //     },
                                        //     pattern: {
                                        //         value: /^[a-zA-Z ]*$/,
                                        //         message: 'Only letters acceptable'
                                        //     }
                                        // })} 
                                        className="resize-none w-full rounded-md border-black border-[1px] text-gray-900 p-2" />
                                        {/* <ErrorMessage
                                            errors={errors}
                                            name="joinreason"
                                            render={({ message }) => <p className='text-[#33B0CA]'>{message}</p>}
                                        /> */}
                                    </div>
                                    <div className="lg:col-span-6 sm:col-span-3">
                                        <label for="mobilenumber" className="text-md font-semibold">Film Experience <span className='text-[#33B0CA]'>*</span></label>
                                        <input type="text" {...register("filmexperience", {
                                            required: {
                                                value: true,
                                                maxLength: 16,
                                                message: 'Film experience is Required'
                                            },
                                            pattern: {
                                                type: "number",
                                                value: /^[0-9]+$/,
                                                maxLength: 10,
                                                message: 'please enter a valid number'
                                            }
                                        })} placeholder="Film Experience in years" className="w-full h-8 rounded-md border-[1px] border-black text-gray-900 p-2" />
                                        <ErrorMessage
                                            errors={errors}
                                            name="filmexperience"
                                            render={({ message }) => <p className='text-[#33B0CA]'>{message}</p>}
                                        />
                                    </div>
                                    <div className="lg:col-span-6 sm:col-span-3">
                                        <label for="skills" className="text-md font-semibold">Skills <span className='text-[#33B0CA]'>*</span></label>
                                        <input type="text" {...register("skills", {
                                            required: {
                                                value: true,
                                                message: 'Skills is Required'
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z ]*$/,
                                                message: 'Only letters acceptable'
                                            }
                                        })} placeholder="Skills" className="w-full h-8 rounded-md border-[1px] border-black text-gray-900 p-2" />
                                        <ErrorMessage
                                            errors={errors}
                                            name="skills"
                                            render={({ message }) => <p className='text-[#33B0CA]'>{message}</p>}
                                        />
                                    </div>
                                    <div className="lg:col-span-6 sm:col-span-3">
                                        <label for="equipments" className="text-md font-semibold">Film Equipments <span className='text-[#33B0CA]'>*</span></label>
                                        <input type="text" {...register("filmequipments", {
                                            required: {
                                                value: true,
                                                message: 'Film Equipments is Required'
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z ]*$/,
                                                message: 'Only letters acceptable'
                                            }
                                        })} placeholder="Skills" className="w-full h-8 rounded-md border-[1px] border-black text-gray-900 p-2" />
                                        <ErrorMessage
                                            errors={errors}
                                            name="skills"
                                            render={({ message }) => <p className='text-[#33B0CA]'>{message}</p>}
                                        />
                                    </div>
                                    <div className="lg:col-span-6 sm:col-span-3">
                                        <label for="clubexperience" className="text-md font-semibold">Club Experience <span className='text-[#33B0CA]'>*</span></label>
                                        <input type="text" {...register("clubexperience", {
                                            required: {
                                                value: true,
                                                message: 'Club experience is Required'
                                            },
                                            pattern: {
                                                value: /^[0-9]+$/,
                                                message: 'Only numbers acceptable'
                                            }
                                        })} placeholder="Club Experience in years" className="w-full h-8 rounded-md border-[1px] border-black text-gray-900 p-2" />
                                        <ErrorMessage
                                            errors={errors}
                                            name="clubexperience"
                                            render={({ message }) => <p className='text-[#33B0CA]'>{message}</p>}
                                        />
                                    </div>
                                    <div className='col-span-6'>
                                        <label className='flex justify-center items-center mt-2'>
                                            <input type="checkbox" value='emailchecked' className="checkbox mr-2" {...register("termcheck", {
                                                required: {
                                                    value: true,
                                                    message: 'Terms and condition checked is Required'
                                                }
                                            })} />
                                            <span className='font-semibold'>I accept all terms and condition of Club</span>
                                        </label>
                                        <ErrorMessage
                                            errors={errors}
                                            name="termcheck"
                                            render={({ message }) => <p className='text-[#33B0CA] text-center'>{message}</p>}
                                        />
                                    </div>
                                    <div className='col-span-6 justify-self-center'>
                                        <input className='uppercase font-semibold px-8 rounded-xl cursor-pointer py-2 mt-4 text-white' style={{ backgroundColor: "#33B0CA" }} type="submit" value='Request to join' />
                                    </div>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default RequestForm;