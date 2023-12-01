import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import CSRFToken from '../CSRF_Token/CSRFToken';
import { useCreateEventMutation } from '../../app/EndPoints/HarkatClub';

const CreateEvent = ({ createEventForm, setCreateEventForm }) => {
    const { id } = useParams();
    const [disable, setDisable] = useState(true);
    const [startDateTime, setStartDateTime] = useState(dayjs().format('YYYY MM DD LT'));
    const [endDateTime, setEndDateTime] = useState(dayjs().format('YYYY MM DD LT'));
    const { register, reset, setError, formState: { errors }, handleSubmit } = useForm();
    const [createEvent, resinfo] = useCreateEventMutation();
    const st = dayjs(startDateTime).format('YYYY MM DD LT');
    const ed = dayjs(endDateTime).format('YYYY MM DD LT');
    useEffect(() => {
        if (st < ed) {
            setDisable(false);
        }
        else {
            toast.error("Start date can not be less then end date", {
                position: toast.POSITION.BOTTOM_CENTER
            });
            setDisable(true);
        }
    }, [ed, st])
    const onSubmit = data => {
        const file = data.picture[0];
        if (file.type !== "image/jpg" && file.type !== "image/jpeg" && file.type !== "image/png") {
            setError("picture", {
                type: "filetype",
                message: "Only image are acceptable."
            });
            return;
        }
        if (startDateTime === endDateTime) {
            toast.error("Start and end date time can not be same.", {
                position: toast.POSITION.BOTTOM_CENTER
            });
            return;
        }
        const name = data.eventname;
        const desciption = data.eventdescription;
        const event_poster = file;
        const coordinator = data.coordinator;
        const coordinator_responsibility = data.coordinator_responsiblity;
        const co_coordinator = data.co_coordinator;
        const co_coordinator_responsibility = data.co_coordinator_responsiblity;
        const venue = data.eventvenue;
        const event_start = dayjs(startDateTime).format('YYYY-MM-DDThh:mm');
        const event_end = dayjs(endDateTime).format('YYYY-MM-DDThh:mm');;
        const equipment = data.firstquipment;
        const equipment_incharge = data.firstperson;
        const preparatory_work = data.firstpreparatory;
        const preparatory_work_incharge = data.firstpreparatoryperson;
        const follow_up_work = data.firstpersonrequire;
        const follow_up_work_incharge = data.firstpersonrequire;
        const prize = data.Prizename;
        const prize_incharge = data.personprize;
        const funds = data.eventfunds;
        const guests = data.guestname;
        const guests_title = data.titleofguest;
        const club_id = id;
        const body = new FormData();
        body.append('name', name);
        body.append('desciption', desciption);
        body.append('club_id', club_id);
        body.append('event_poster', event_poster);
        body.append('coordinator', coordinator);
        body.append('coordinator_responsibility', coordinator_responsibility);
        body.append('co_coordinator', co_coordinator);
        body.append('co_coordinator_responsibility', co_coordinator_responsibility);
        body.append('venue', venue);
        body.append('event_start', event_start);
        body.append('event_end', event_end);
        body.append('equipment', equipment);
        body.append('equipment_incharge', equipment_incharge);
        body.append('preparatory_work', preparatory_work);
        body.append('preparatory_work_incharge', preparatory_work_incharge);
        body.append('follow_up_work', follow_up_work);
        body.append('follow_up_work_incharge', follow_up_work_incharge);
        body.append('prize', prize);
        body.append('prize_incharge', prize_incharge);
        body.append('funds', funds);
        body.append('guests', guests);
        body.append('guests_title', guests_title);
        createEvent(body);
        reset();
        if (!resinfo.isSuccess) {
            toast.info("Your event is creating now", {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
    }
    if (resinfo.isSuccess) {
        toast.success("Event created successfully.", {
            position: toast.POSITION.BOTTOM_CENTER
        });
        setCreateEventForm(false);
        resinfo.isSuccess = false;
        window.location.reload();
    }
    return (
        <div>
            {createEventForm && <div>
                <input type="checkbox" id="create-event" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box  w-11/12 max-w-5xl relative mt-20 2xl:mt-0">
                        <label htmlFor="create-event" className="btn btn-sm btn-circle absolute right-2 top-2 hover:text-white">✕</label>
                        <section className="p-6 bg-slate-100 text-black">
                            <form onSubmit={handleSubmit(onSubmit)} className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
                                <CSRFToken />
                                <div className="grid grid-cols-4 gap-4 col-span-6 lg:col-span-3">
                                    <div className="lg:col-span-6 sm:col-span-3">
                                        <label htmlFor="eventname" className="text-md font-semibold">Event name <span className='text-[#ee3c4d]'>*</span></label>
                                        <input type="text" {...register("eventname", {
                                            required: {
                                                value: true,
                                                message: 'Event name is Required'
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z ]*$/,
                                                message: 'Only letters acceptable'
                                            }
                                        })} placeholder="Event name" className="w-full h-8 rounded-md border-[1px] border-black text-gray-900 p-2" />
                                        <ErrorMessage
                                            errors={errors}
                                            name="eventname"
                                            render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                        />
                                    </div>
                                    <div className="col-span-6 lg:col-span-2">
                                        <label htmlFor="email" className="text-md font-semibold">Event description <span className='text-[#ee3c4d]'>*</span></label>
                                        <textarea type="text" placeholder="description" {...register("eventdescription", {
                                            required: {
                                                value: true,
                                                maxLength: 300,
                                                message: 'Event Description is Required'
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z ]*$/,
                                                message: 'Only letters acceptable'
                                            }
                                        })} className="resize-none w-full rounded-md border-black border-[1px] text-gray-900 p-2" />
                                        <ErrorMessage
                                            errors={errors}
                                            name="eventdescription"
                                            render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                        />
                                    </div>
                                    <div className="col-span-6 lg:col-span-3">
                                        <label htmlFor="upload Image" className="text-md font-semibold">Upload Event Flyer (Image formate only) <span className='text-[#ee3c4d]'>*</span></label>
                                        <input type="file" className="file-input file-input-bordered file-input-error w-full max-w-xs p-0" accept='image/*' name='picture' {...register("picture", {
                                            required: {
                                                value: true,
                                                message: 'Event Flyer is Required'
                                            }
                                        })} />
                                        <ErrorMessage
                                            errors={errors}
                                            name="picture"
                                            render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                        />
                                    </div>
                                    <div className="lg:col-span-6 sm:col-span-3">
                                        <label htmlFor="eventname" className="text-md font-semibold">Event coordinator <span className='text-[#ee3c4d]'>*</span></label>
                                        <div className='grid grid-cols-2 gap-3'>
                                            <div>
                                                <input type="text" name='coordinator' placeholder="Event coordinator name" className="w-full h-8 rounded-md border-[1px] border-black text-gray-900 p-2"  {...register("coordinator", {
                                                    required: {
                                                        value: true,
                                                        message: 'Event Coordinator is Required'
                                                    },
                                                    pattern: {
                                                        value: /^[a-zA-Z ]*$/,
                                                        message: 'Only letters acceptable'
                                                    }
                                                })} />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="coordinator"
                                                    render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                                />
                                            </div>
                                            <div>
                                                <input type="text" name='responsiblity' placeholder="responsiblity" className="w-full h-8 rounded-md border-black border-[1px] text-gray-900 p-2"  {...register("coordinator_responsiblity", {
                                                    required: {
                                                        value: true,
                                                        message: 'Event Coordinator responsiblity is Required'
                                                    },
                                                    pattern: {
                                                        value: /^[a-zA-Z ]*$/,
                                                        message: 'Only letters acceptable'
                                                    }
                                                })} />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="coordinator_responsiblity"
                                                    render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                                />
                                            </div>
                                            <div>
                                                <input type="text" name='cocoordinator' placeholder="Co_cordinator name" className="w-full h-8 rounded-md border-black border-[1px] text-gray-900 p-2" {...register("co_coordinator", {
                                                    required: {
                                                        value: true,
                                                        message: 'Event Co-Coordinator is Required'
                                                    },
                                                    pattern: {
                                                        value: /^[a-zA-Z ]*$/,
                                                        message: 'Only letters acceptable'
                                                    }
                                                })} />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="co_coordinator"
                                                    render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                                />
                                            </div>
                                            <div>
                                                <input type="text" name='co-responsiblity' placeholder="co responsiblity" className="w-full h-8 rounded-md border-black border-[1px] text-gray-900 p-2" {...register("co_coordinator_responsiblity", {
                                                    required: {
                                                        value: true,
                                                        message: 'Event Co-Coordinator responsiblity is Required'
                                                    },
                                                    pattern: {
                                                        value: /^[a-zA-Z ]*$/,
                                                        message: 'Only letters acceptable'
                                                    }
                                                })} />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="co_coordinator_responsiblity"
                                                    render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-6">
                                        <label htmlFor="address" className="text-md font-semibold">Event Venue details <span className='text-[#ee3c4d]'>*</span></label>
                                        <input name="address" type="text" placeholder="Address" className="w-full rounded-md border-black border-[1px] text-gray-900 h-8 p-2"  {...register("eventvenue", {
                                            required: {
                                                value: true,
                                                message: 'Event venue details is Required'
                                            },
                                        })} />
                                        <ErrorMessage
                                            errors={errors}
                                            name="eventvenue"
                                            render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                        />
                                    </div>
                                    <div className="lg:col-span-6 sm:col-span-2 date-container-event">
                                        <label htmlFor="city" className="text-md font-semibold">Enter timings <span className='text-[#ee3c4d]'>*</span></label>
                                        <div className='grid grid-cols-2 gap-3'>
                                            <div>
                                                <label htmlFor="city" className="text-sm font-semibold">Start date</label>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <MobileDateTimePicker
                                                        value={startDateTime}
                                                        onChange={(newValue) => {
                                                            setStartDateTime(newValue);
                                                        }}
                                                        renderInput={(params) => <TextField required fullWidth {...params} />}
                                                    />
                                                </LocalizationProvider>
                                            </div>
                                            <div>
                                                <label className="text-sm font-semibold">End date</label>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <MobileDateTimePicker
                                                        value={endDateTime}
                                                        onChange={(newValue) => {
                                                            setEndDateTime(newValue);
                                                        }}
                                                        renderInput={(params) => <TextField required fullWidth {...params} />}
                                                    />
                                                </LocalizationProvider>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-6 sm:col-span-3">
                                        <label htmlFor="eventname" className="text-md font-semibold">Event Equipment required</label>
                                        <div className='grid grid-cols-2 gap-3'>
                                            <div>
                                                <input type="text" name='firstequipment' placeholder="equipment" className="w-full h-8 rounded-md border-black border-[1px] text-gray-900 p-2"  {...register("firstquipment", {
                                                    required: {
                                                        value: true,
                                                        message: 'Equipment is Required'
                                                    },
                                                    pattern: {
                                                        value: /^[a-zA-Z ]*$/,
                                                        message: 'Only letters acceptable'
                                                    }
                                                })} />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="firstquipment"
                                                    render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                                />
                                            </div>
                                            <div>
                                                <input type="text" name='firstperson' placeholder="person in charge" className="w-full h-8 rounded-md border-black border-[1px] text-gray-900 p-2"  {...register("firstperson", {
                                                    required: {
                                                        value: true,
                                                        message: 'Person in charge is Required'
                                                    },
                                                    pattern: {
                                                        value: /^[a-zA-Z ]*$/,
                                                        message: 'Only letters acceptable'
                                                    }
                                                })} />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="firstperson"
                                                    render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                                />
                                            </div>
                                            <div>
                                                <input type="text" name='secondequipment' placeholder="equipment" className="w-full h-8 rounded-md border-black border-[1px] text-gray-900 p-2" {...register("secondequipment", {
                                                    required: {
                                                        value: true,
                                                        message: 'Equipment is Required'
                                                    },
                                                    pattern: {
                                                        value: /^[a-zA-Z ]*$/,
                                                        message: 'Only letters acceptable'
                                                    }
                                                })} />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="secondequipment"
                                                    render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                                />
                                            </div>
                                            <div> <input type="text" name='secondperson' placeholder="person in charge" className="w-full h-8 rounded-md border-black border-[1px] text-gray-900 p-2" {...register("secondperson", {
                                                required: {
                                                    value: true,
                                                    message: 'Person in charge is Required'
                                                },
                                                pattern: {
                                                    value: /^[a-zA-Z ]*$/,
                                                    message: 'Only letters acceptable'
                                                }
                                            })} />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="secondperson"
                                                    render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-6 sm:col-span-3">
                                        <label htmlFor="eventname" className="text-md font-semibold">Event Preparatory work required</label>
                                        <div className='grid grid-cols-2 gap-3'>
                                            <div><input type="text" name='firstpreparatory' placeholder="work" className="w-full h-8 rounded-md border-black border-[1px] text-gray-900 p-2" {...register("firstpreparatory", {
                                                required: {
                                                    value: true,
                                                    message: 'Event Preparatory work is Required'
                                                },
                                                pattern: {
                                                    value: /^[a-zA-Z ]*$/,
                                                    message: 'Only letters acceptable'
                                                }
                                            })} />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="firstpreparatory"
                                                    render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                                /></div>
                                            <div> <input type="text" name='firstpreparatoryperson' placeholder="person in charge" className="w-full h-8 rounded-md border-black border-[1px] text-gray-900 p-2" {...register("firstpreparatoryperson", {
                                                required: {
                                                    value: true,
                                                    message: 'Person in charge is Required'
                                                },
                                                pattern: {
                                                    value: /^[a-zA-Z ]*$/,
                                                    message: 'Only letters acceptable'
                                                }
                                            })} />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="firstpreparatoryperson"
                                                    render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                                />
                                            </div>
                                            <div><input type="text" name='' placeholder="work" className="w-full h-8 rounded-md focus:ring border-black border-[1px] text-gray-900 p-2" {...register("secondpreparatory", {
                                                required: {
                                                    value: true,
                                                    message: 'Event Preparatory work is Required'
                                                },
                                                pattern: {
                                                    value: /^[a-zA-Z ]*$/,
                                                    message: 'Only letters acceptable'
                                                }
                                            })} /> <ErrorMessage
                                                    errors={errors}
                                                    name="secondpreparatory"
                                                    render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                                /></div>
                                            <div> <input type="text" name='eventname' placeholder="Person in charge" className="w-full h-8 rounded-md border-black border-[1px] text-gray-900 p-2" {...register("secondpreparatoryperson", {
                                                required: {
                                                    value: true,
                                                    message: 'Person in charge is Required'
                                                },
                                                pattern: {
                                                    value: /^[a-zA-Z ]*$/,
                                                    message: 'Only letters acceptable'
                                                }
                                            })} /> <ErrorMessage
                                                    errors={errors}
                                                    name="secondpreparatoryperson"
                                                    render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                                /></div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-6 sm:col-span-3">
                                        <label className="text-md font-semibold">Event Follow up work required</label>
                                        <div className='grid grid-cols-2 gap-3'>
                                            <div>
                                                <input type="text" name='' placeholder=" Event follow up work required" className="w-full h-8 rounded-md border-black border-[1px] text-gray-900 p-2" {...register("firstworkrequire", {
                                                    required: {
                                                        value: true,
                                                        message: 'Event Follow up work is Required'
                                                    },
                                                    pattern: {
                                                        value: /^[a-zA-Z ]*$/,
                                                        message: 'Only letters acceptable'
                                                    }
                                                })} />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="firstworkrequire"
                                                    render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                                />
                                            </div>
                                            <div>
                                                <input type="text" name='eventname' placeholder="Person in charge" className="w-full h-8 rounded-md border-black border-[1px] text-gray-900 p-2" {...register("firstpersonrequire", {
                                                    required: {
                                                        value: true,
                                                        message: 'Person in charge is Required'
                                                    },
                                                    pattern: {
                                                        value: /^[a-zA-Z ]*$/,
                                                        message: 'Only letters acceptable'
                                                    }
                                                })} />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="firstpersonrequire"
                                                    render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                                />
                                            </div>
                                            <div>
                                                <input type="text" name='eventname' placeholder="Event follow up work require" className="w-full h-8 rounded-md border-[1px] border-black text-gray-900 p-2" {...register("secondworkrequire", {
                                                    required: {
                                                        value: true,
                                                        message: 'Event Follow up work is Required'
                                                    },
                                                    pattern: {
                                                        value: /^[a-zA-Z ]*$/,
                                                        message: 'Only letters acceptable'
                                                    }
                                                })} />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="secondworkrequire"
                                                    render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                                />
                                            </div>
                                            <div>
                                                <input type="text" name='eventname' placeholder="Person in charge" className="w-full h-8 rounded-md border-[1px] border-black text-gray-900 p-2" {...register("secondpersonrequire", {
                                                    required: {
                                                        value: true,
                                                        message: 'person in charge is Required'
                                                    },
                                                    pattern: {
                                                        value: /^[a-zA-Z ]*$/,
                                                        message: 'Only letters acceptable'
                                                    }
                                                })} />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="secondpersonrequire"
                                                    render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-6 sm:col-span-2">
                                        <label htmlFor="city" className="text-md font-semibold">Event prize</label>
                                        <div className='grid grid-cols-2 gap-3'>
                                            <div>
                                                <input type="text" placeholder="Prize Name" className="w-full rounded-md border-[1px] border-black text-gray-900 h-8 p-2" {...register("Prizename", {
                                                    required: {
                                                        value: true,
                                                        message: 'Event Prize is Required'
                                                    },
                                                    pattern: {
                                                        value: /^[a-zA-Z ]*$/,
                                                        message: 'Only letters acceptable'
                                                    }
                                                })} />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="Prizename"
                                                    render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                                />
                                            </div>
                                            <div>
                                                <input id="city" type="text" placeholder="Person in charge" className="w-full rounded-md border-[1px]  border-black text-gray-900 h-8 p-2" {...register("personprize", {
                                                    required: {
                                                        value: true,
                                                        message: 'Person in charge is Required'
                                                    },
                                                    pattern: {
                                                        value: /^[a-zA-Z ]*$/,
                                                        message: 'Only letters acceptable'
                                                    }
                                                })} />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="personprize"
                                                    render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-6 sm:col-span-2">
                                        <label htmlFor="city" className="text-md font-semibold">Event Funds <span className='text-[#ee3c4d]'>*</span></label>
                                        <div className='grid grid-cols-2 gap-3'>
                                            <div>
                                                <input id="city" type="text" placeholder="funds amount" className="w-full rounded-md border-[1px]  border-black text-gray-900 h-8 p-2" {...register("eventfunds", {
                                                    required: {
                                                        value: true,
                                                        message: 'Event Funds is Required'
                                                    },
                                                    pattern: {
                                                        value: /^[0-9]+$/,
                                                        message: 'Only numbers acceptable'
                                                    }
                                                })} />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="eventfunds"
                                                    render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                                />
                                            </div>
                                            <div>
                                                <input id="city" type="text" placeholder="Fund source" className="w-full rounded-md border-[1px]  border-black text-gray-900 h-8 p-2" {...register("fundsource", {
                                                    required: {
                                                        value: true,
                                                        message: 'Event Fund source is Required'
                                                    },
                                                    pattern: {
                                                        value: /^[a-zA-Z ]*$/,
                                                        message: 'Only letters acceptable'
                                                    }
                                                })} />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="fundsource"
                                                    render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-6 sm:col-span-2">
                                        <label htmlFor="city" className="text-md font-semibold">Event Guest name</label>
                                        <div className='grid grid-cols-2 gap-3'>
                                            <div>
                                                <input id="city" type="text" placeholder="Event guest name" className="w-full rounded-md  border-black border-[1px] text-gray-900 h-8 p-2" {...register("guestname", {
                                                    required: {
                                                        value: true,
                                                        message: 'Event Guest name is Required'
                                                    },
                                                    pattern: {
                                                        value: /^[a-zA-Z ]*$/,
                                                        message: 'Only letters acceptable'
                                                    }
                                                })} />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="guestname"
                                                    render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                                />
                                            </div>
                                            <div>
                                                <input id="city" type="text" placeholder="Short title" className="w-full rounded-md  border-black border-[1px] text-gray-900 h-8 p-2" {...register("titleofguest", {
                                                    required: {
                                                        value: true,
                                                        message: 'Guest short title is Required'
                                                    },
                                                    pattern: {
                                                        value: /^[a-zA-Z ]*$/,
                                                        message: 'Only letters acceptable'
                                                    }
                                                })} />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="titleofguest"
                                                    render={({ message }) => <p className='text-[#ee3c4d]'>{message}</p>}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-span-6 justify-self-center'>
                                        <label className='flex justify-center items-center'>
                                            <input type="checkbox" value='emailchecked' className="checkbox mr-2" checked {...register("emailcheck", {
                                            })} />
                                            <span>Send email to attendees</span>
                                        </label>
                                    </div>
                                    <div className='col-span-6 justify-self-center'>
                                        <input className={disable ? 'bg-gray-300 uppercase font-semibold px-8 rounded-xl cursor-pointer py-2 mt-4 text-white' : 'bg-primary uppercase font-semibold px-8 rounded-xl cursor-pointer py-2 mt-4 text-white'} disabled={disable} type="submit" value='Create event' />
                                    </div>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>}
        </div >
    );
};

export default CreateEvent;